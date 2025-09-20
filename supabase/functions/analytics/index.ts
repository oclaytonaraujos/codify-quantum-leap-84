import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsEvent {
  event: string;
  page?: string;
  timestamp: number;
  user_agent: string;
  referrer: string;
  session_id: string;
  metadata?: Record<string, any>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    if (req.method === 'POST') {
      const event: AnalyticsEvent = await req.json();
      
      // Validate event data
      if (!event.event || !event.timestamp || !event.session_id) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Extract useful metadata
      const metadata = {
        ...event.metadata,
        ip_address: req.headers.get('x-forwarded-for') || req.headers.get('remote-addr'),
        country: req.headers.get('cf-ipcountry'),
        user_agent: event.user_agent,
        referrer: event.referrer,
        page: event.page
      };

      // Store analytics event
      const { data, error } = await supabaseClient
        .from('analytics_events')
        .insert({
          event_name: event.event,
          session_id: event.session_id,
          timestamp: new Date(event.timestamp).toISOString(),
          metadata: metadata,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to store event' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Process special events for business metrics
      await processBusinessMetrics(supabaseClient, event);

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'GET') {
      // Get analytics summary (for admin dashboard)
      const url = new URL(req.url);
      const startDate = url.searchParams.get('start') || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const endDate = url.searchParams.get('end') || new Date().toISOString();

      // Page views
      const { data: pageViews } = await supabaseClient
        .from('analytics_events')
        .select('metadata, timestamp')
        .eq('event_name', 'page_view')
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      // Conversions
      const { data: conversions } = await supabaseClient
        .from('analytics_events')
        .select('metadata, timestamp')
        .eq('event_name', 'conversion')
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      // Performance metrics
      const { data: performance } = await supabaseClient
        .from('analytics_events')
        .select('metadata, timestamp')
        .eq('event_name', 'performance_metric')
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      // Error tracking
      const { data: errors } = await supabaseClient
        .from('analytics_events')
        .select('metadata, timestamp')
        .in('event_name', ['javascript_error', 'promise_rejection'])
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      const summary = {
        pageViews: {
          total: pageViews?.length || 0,
          unique: new Set(pageViews?.map(pv => pv.metadata?.page)).size || 0,
          byPage: groupByPage(pageViews || [])
        },
        conversions: {
          total: conversions?.length || 0,
          byType: groupByConversionType(conversions || [])
        },
        performance: {
          avgLCP: calculateAverage(performance || [], 'lcp'),
          avgFID: calculateAverage(performance || [], 'fid'),
          avgCLS: calculateAverage(performance || [], 'cls'),
          avgLoadTime: calculateAverage(performance || [], 'load_time')
        },
        errors: {
          total: errors?.length || 0,
          byType: groupByErrorType(errors || [])
        },
        timeRange: { startDate, endDate }
      };

      return new Response(
        JSON.stringify(summary),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Analytics function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper functions
async function processBusinessMetrics(supabaseClient: any, event: AnalyticsEvent) {
  // Track conversion events for business metrics
  if (event.event === 'conversion') {
    await supabaseClient
      .from('business_metrics')
      .insert({
        metric_type: 'conversion',
        metric_name: event.metadata?.conversion_type || 'unknown',
        value: event.metadata?.value || 1,
        timestamp: new Date(event.timestamp).toISOString(),
        session_id: event.session_id,
        metadata: event.metadata
      });
  }

  // Track performance metrics
  if (event.event === 'performance_metric') {
    await supabaseClient
      .from('performance_metrics')
      .insert({
        metric_name: event.metadata?.metric_name || 'unknown',
        value: event.metadata?.duration || event.metadata?.value || 0,
        timestamp: new Date(event.timestamp).toISOString(),
        session_id: event.session_id,
        page: event.page,
        metadata: event.metadata
      });
  }
}

function groupByPage(pageViews: any[]) {
  const grouped: Record<string, number> = {};
  pageViews.forEach(pv => {
    const page = pv.metadata?.page || 'unknown';
    grouped[page] = (grouped[page] || 0) + 1;
  });
  return grouped;
}

function groupByConversionType(conversions: any[]) {
  const grouped: Record<string, number> = {};
  conversions.forEach(conv => {
    const type = conv.metadata?.conversion_type || 'unknown';
    grouped[type] = (grouped[type] || 0) + 1;
  });
  return grouped;
}

function groupByErrorType(errors: any[]) {
  const grouped: Record<string, number> = {};
  errors.forEach(err => {
    const type = err.metadata?.error_message?.split(':')[0] || 'unknown';
    grouped[type] = (grouped[type] || 0) + 1;
  });
  return grouped;
}

function calculateAverage(metrics: any[], metricName: string) {
  const values = metrics
    .filter(m => m.metadata?.[metricName] !== undefined)
    .map(m => parseFloat(m.metadata[metricName]));
  
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}