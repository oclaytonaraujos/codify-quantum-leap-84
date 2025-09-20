import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProjectNotificationRequest {
  projectLeadId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectLeadId }: ProjectNotificationRequest = await req.json();

    console.log("Processing notification for project lead:", projectLeadId);

    // Get project lead data
    const { data: projectLead, error: fetchError } = await supabase
      .from('project_leads')
      .select('*')
      .eq('id', projectLeadId)
      .single();

    if (fetchError || !projectLead) {
      console.error("Error fetching project lead:", fetchError);
      throw new Error("Project lead not found");
    }

    // Send confirmation email to client
    const clientEmailResponse = await resend.emails.send({
      from: "Codify <contato@codifydev.com.br>",
      to: [projectLead.email],
      subject: "Recebemos sua solicitação de projeto - Codify",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">Codify</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">Olá, ${projectLead.name}!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Recebemos sua solicitação de projeto <strong>"${projectLead.project_title}"</strong> 
              e nossa equipe já está analisando os detalhes.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Resumo do seu projeto:</h3>
              <ul style="color: #666; line-height: 1.6;">
                <li><strong>Tipo:</strong> ${projectLead.project_type}</li>
                <li><strong>Orçamento:</strong> ${projectLead.budget}</li>
                <li><strong>Prazo:</strong> ${projectLead.timeline}</li>
                <li><strong>Contato preferido:</strong> ${projectLead.preferred_contact}</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Entraremos em contato em até <strong>24 horas</strong> para discutir os detalhes 
              e agendar uma conversa sobre seu projeto.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/5564999999999" 
                 style="background: #25D366; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 25px; display: inline-block;">
                📱 Fale conosco no WhatsApp
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; text-align: center; margin-top: 30px;">
              Codify - Transformando ideias em realidade digital
            </p>
          </div>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Codify <contato@codifydev.com.br>",
      to: ["contato@codifydev.com.br"], // Replace with actual admin email
      subject: `🚀 Novo Projeto: ${projectLead.project_title}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">Novo Lead de Projeto</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">Dados do Cliente</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nome:</strong> ${projectLead.name}</p>
              <p><strong>Email:</strong> ${projectLead.email}</p>
              <p><strong>Telefone:</strong> ${projectLead.phone}</p>
              <p><strong>Empresa:</strong> ${projectLead.company || 'Não informado'}</p>
            </div>
            
            <h3 style="color: #333;">Detalhes do Projeto</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Título:</strong> ${projectLead.project_title}</p>
              <p><strong>Tipo:</strong> ${projectLead.project_type}</p>
              <p><strong>Orçamento:</strong> ${projectLead.budget}</p>
              <p><strong>Prazo:</strong> ${projectLead.timeline}</p>
              <p><strong>Contato preferido:</strong> ${projectLead.preferred_contact}</p>
              
              <h4>Funcionalidades:</h4>
              <ul>
                ${projectLead.features.map((feature: string) => `<li>${feature}</li>`).join('')}
              </ul>
              
              <h4>Plataformas:</h4>
              <ul>
                ${projectLead.platforms.map((platform: string) => `<li>${platform}</li>`).join('')}
              </ul>
              
              <h4>Descrição:</h4>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">${projectLead.project_description}</p>
              
              ${projectLead.additional_info ? `
                <h4>Informações Adicionais:</h4>
                <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">${projectLead.additional_info}</p>
              ` : ''}
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${projectLead.email}" 
                 style="background: #007bff; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px;">
                📧 Responder por Email
              </a>
              <a href="https://wa.me/55${projectLead.phone.replace(/\D/g, '')}" 
                 style="background: #25D366; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px;">
                📱 Contatar via WhatsApp
              </a>
            </div>
          </div>
        </div>
      `,
    });

    // Log email notifications
    await supabase.from('email_notifications').insert([
      {
        project_lead_id: projectLeadId,
        recipient_email: projectLead.email,
        subject: "Recebemos sua solicitação de projeto - Codify",
        template_name: "client_confirmation",
        status: clientEmailResponse.error ? "failed" : "sent",
        error_message: clientEmailResponse.error?.message || null,
        sent_at: clientEmailResponse.error ? null : new Date().toISOString(),
      },
      {
        project_lead_id: projectLeadId,
        recipient_email: "contato@codifydev.com.br",
        subject: `🚀 Novo Projeto: ${projectLead.project_title}`,
        template_name: "admin_notification",
        status: adminEmailResponse.error ? "failed" : "sent",
        error_message: adminEmailResponse.error?.message || null,
        sent_at: adminEmailResponse.error ? null : new Date().toISOString(),
      },
    ]);

    console.log("Email notifications sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true,
        clientEmailSent: !clientEmailResponse.error,
        adminEmailSent: !adminEmailResponse.error,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-project-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);