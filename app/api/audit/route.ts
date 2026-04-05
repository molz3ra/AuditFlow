import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase'; 

export async function POST(request: Request) {
  try {
    // AGORA RECEBEMOS O EMAIL TAMBÉM
    const { url, email } = await request.json();
    console.log("Tentando auditar URL:", url, "Email do Lead:", email);

    if (!url) {
      return NextResponse.json({ error: "URL é obrigatória" }, { status: 400 });
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const report = {
      url: url,
      scores: { performance: 45, seo: 92, accessibility: 78, bestPractices: 65 },
      metrics: { lcp: "3.2 s", fid: "120 ms", cls: "0.45", speedIndex: "4.5 s" },
      opportunities: [
        "Comprima imagens para WebP (Economia estimada: 2.1MB)",
        "Remova JavaScript bloqueador de renderização na home",
        "Adicione atributos 'alt' em 4 imagens para acessibilidade",
        "Corrija o contraste de cores nos botões principais",
        "Sirva recursos estáticos com cache eficiente"
      ]
    };

    try {
      const { error: dbError } = await supabase
        .from('audits')
        .insert([{ 
          url: url, 
          email: email, // SALVANDO O LEAD AQUI!
          performance_score: report.scores.performance, 
          seo_score: report.scores.seo,
          report_data: {
            metrics: report.metrics,
            accessibility: report.scores.accessibility,
            bestPractices: report.scores.bestPractices,
            opportunities: report.opportunities
          }
        }]);

      if (dbError) throw new Error(dbError.message);
      console.log("✅ Lead e Auditoria salvos no Supabase!");
    } catch (dbErr) {
      const message = dbErr instanceof Error ? dbErr.message : "Erro desconhecido no banco";
      console.error("❌ Erro ao salvar no Supabase:", message);
    }

    return NextResponse.json(report);

  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro interno desconhecido";
    console.error("❌ Erro Crítico na Rota:", message);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}