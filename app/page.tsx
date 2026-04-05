'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from 'next-themes';
import { Sun, Moon, FileDown, CheckCircle2, Mail, Globe } from 'lucide-react';
import { jsPDF } from 'jspdf';

const translations = {
  pt: { 
    title: "AuditFlow 🚀", subtitle: "Auditoria técnica completa. Descubra gargalos e escale suas vendas.", urlPlaceholder: "https://sualoja.com.br", emailPlaceholder: "Seu e-mail profissional", btnAudit: "Gerar Auditoria Profissional", btnLoading: "Auditando 40+ fatores...", emptyState: "👆 Preencha os dados acima para gerar o relatório.", resultTitle: "Relatório Executivo", resultUrl: "Análise detalhada para:", perf: "Performance", seo: "SEO", acc: "Acessibilidade", bp: "Boas Práticas", lcp: "Carregamento (LCP):", fid: "Interatividade (FID):", cls: "Estabilidade (CLS):", planTitle: "Checklist de Otimização Imediata:", errorAlert: "Erro ao processar a análise.", btnPdf: "Exportar Relatório PDF"
  },
  en: {
    title: "AuditFlow 🚀", subtitle: "Complete technical audit. Discover bottlenecks and scale sales.", urlPlaceholder: "https://yourstore.com", emailPlaceholder: "Your best professional email", btnAudit: "Run Professional Audit", btnLoading: "Auditing 40+ factors...", emptyState: "👆 Fill in the details above to generate the report.", resultTitle: "Executive Report", resultUrl: "Detailed analysis for:", perf: "Performance", seo: "SEO", acc: "Accessibility", bp: "Best Practices", lcp: "Loading (LCP):", fid: "Interactivity (FID):", cls: "Stability (CLS):", planTitle: "Immediate Optimization Checklist:", errorAlert: "Error processing.", btnPdf: "Export PDF Report"
  }
};

interface AuditResult {
  scores: { performance: number; seo: number; accessibility?: number; bestPractices?: number };
  metrics: { lcp: string; fid: string; cls?: string; speedIndex?: string };
  opportunities: string | string[]; 
}

export default function Home() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState(''); // ESTADO DO NOVO LEAD
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const t = translations[lang];

  const runAudit = async () => { 
    if (!url || !email) return; // Agora exige os dois!
    setLoading(true); setResult(null);
    try {
      // Enviando URL e EMAIL para a API
      const response = await axios.post('/api/audit', { url, email });
      setResult(response.data);
    } catch (err) { console.error(err); alert(t.errorAlert); } finally { setLoading(false); }
  };

  const exportPDF = () => { /* ... logica do PDF mantida ... */
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(22); doc.setTextColor(79, 70, 229); doc.text("AuditFlow - Relatorio Executivo", 20, 20);
    doc.setFontSize(11); doc.setTextColor(100); doc.text(`URL: ${url}`, 20, 30); doc.text(`Lead: ${email}`, 20, 36); doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 42);
    doc.setFontSize(16); doc.setTextColor(0); doc.text("Visao Geral (Scores):", 20, 55);
    doc.setFontSize(12); doc.text(`- Performance: ${result.scores.performance}/100`, 25, 65); doc.text(`- SEO: ${result.scores.seo}/100`, 25, 72); doc.text(`- Acessibilidade: ${result.scores.accessibility || 'N/A'}/100`, 25, 79); doc.text(`- Boas Praticas: ${result.scores.bestPractices || 'N/A'}/100`, 25, 86);
    doc.setFontSize(16); doc.text("Metricas (Core Web Vitals):", 20, 100);
    doc.setFontSize(12); doc.text(`- LCP: ${result.metrics.lcp}`, 25, 110); doc.text(`- FID: ${result.metrics.fid}`, 25, 117); doc.text(`- CLS: ${result.metrics.cls || 'N/A'}`, 25, 124);
    doc.setFontSize(16); doc.setTextColor(180, 83, 9); doc.text("Plano de Acao:", 20, 140);
    doc.setFontSize(11); doc.setTextColor(0);
    const oppsArray = Array.isArray(result.opportunities) ? result.opportunities : typeof result.opportunities === 'string' ? [result.opportunities] : ["Nenhuma oportunidade detectada."];
    const oppsFormatted = oppsArray.map(opp => `* ${opp}`); doc.text(oppsFormatted, 25, 150);
    doc.setFontSize(10); doc.setTextColor(150); doc.text("Relatorio gerado de forma automatizada via AuditFlow.", 20, 280);
    doc.save(`auditflow-${url.replace('https://', '').replace('/', '')}.pdf`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 py-8 px-4 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500">
      <div className="max-w-5xl mx-auto flex justify-end items-center gap-4 mb-8">
        <select value={lang} onChange={(e) => setLang(e.target.value as 'pt' | 'en')} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 px-3 rounded-xl shadow-sm text-sm transition-colors cursor-pointer">
          <option value="pt">🇧🇷 Português</option>
          <option value="en">🇺🇸 English</option>
        </select>
        {mounted && (
          <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="relative p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-slate-500 dark:text-amber-400 hover:scale-110 active:scale-95 flex items-center justify-center w-10 h-10 overflow-hidden transition-all">
            <Moon className="absolute w-5 h-5 transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-indigo-500" />
            <Sun className="absolute w-5 h-5 transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-amber-400" />
          </button>
        )}
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">{t.title}</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* NOVO FORMULÁRIO DE CAPTURA (URL + EMAIL) */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-2xl shadow-indigo-100/40 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-12 flex flex-col gap-4 max-w-3xl mx-auto transition-all">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type="url" placeholder={t.urlPlaceholder} className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-100 transition-all border border-transparent dark:border-slate-700/50" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type="email" placeholder={t.emailPlaceholder} className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-100 transition-all border border-transparent dark:border-slate-700/50" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && runAudit()} />
            </div>
          </div>
          <button onClick={runAudit} disabled={loading || !url || !email} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
            {loading ? t.btnLoading : t.btnAudit}
          </button>
        </div>

        {!result && !loading && (
           <div className="text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 max-w-3xl mx-auto">
             <p>{t.emptyState}</p>
           </div>
        )}

        {/* Resultados e PDF (Igual ao anterior) */}
        {result && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">{t.resultTitle}</h2>
                <p className="text-sm text-slate-500">{t.resultUrl} <span className="font-semibold text-indigo-600">{url}</span></p>
              </div>
              <button onClick={exportPDF} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-200 dark:shadow-none hover:scale-105 active:scale-95">
                <FileDown size={18} />
                {t.btnPdf}
              </button>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-6 bg-rose-50 dark:bg-slate-800 rounded-2xl border border-rose-100 dark:border-slate-700 text-center md:text-left">
                  <p className="text-sm text-rose-600 font-bold mb-1">{t.perf}</p>
                  <p className="text-4xl font-black text-rose-900 dark:text-white">{result.scores.performance}</p>
                </div>
                <div className="p-6 bg-emerald-50 dark:bg-slate-800 rounded-2xl border border-emerald-100 dark:border-slate-700 text-center md:text-left">
                  <p className="text-sm text-emerald-600 font-bold mb-1">{t.seo}</p>
                  <p className="text-4xl font-black text-emerald-900 dark:text-white">{result.scores.seo}</p>
                </div>
                <div className="p-6 bg-purple-50 dark:bg-slate-800 rounded-2xl border border-purple-100 dark:border-slate-700 text-center md:text-left">
                  <p className="text-sm text-purple-600 font-bold mb-1">{t.acc}</p>
                  <p className="text-4xl font-black text-purple-900 dark:text-white">{result.scores.accessibility || 'N/A'}</p>
                </div>
                <div className="p-6 bg-amber-50 dark:bg-slate-800 rounded-2xl border border-amber-100 dark:border-slate-700 text-center md:text-left">
                  <p className="text-sm text-amber-600 font-bold mb-1">{t.bp}</p>
                  <p className="text-4xl font-black text-amber-900 dark:text-white">{result.scores.bestPractices || 'N/A'}</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div><p className="text-slate-500 text-sm mb-1">{t.lcp}</p><p className="font-mono text-xl font-bold">{result.metrics.lcp}</p></div>
                <div><p className="text-slate-500 text-sm mb-1">{t.fid}</p><p className="font-mono text-xl font-bold">{result.metrics.fid}</p></div>
                <div><p className="text-slate-500 text-sm mb-1">{t.cls}</p><p className="font-mono text-xl font-bold">{result.metrics.cls || 'N/A'}</p></div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700">
                <p className="text-slate-800 dark:text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-xl">🛠️</span> {t.planTitle}
                </p>
                <ul className="space-y-3">
                  {(Array.isArray(result.opportunities) ? result.opportunities : typeof result.opportunities === 'string' ? [result.opportunities] : []).map((opp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}