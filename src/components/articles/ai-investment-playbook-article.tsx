
"use client";

import React from 'react';
import { InvestmentPortfolioChart } from '@/components/investment-portfolio-chart';
import { EnrollmentForm } from '@/components/enrollment-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ArticleContent = () => {
    return (
        <div>
            <p className="mb-6 text-lg text-muted-foreground">I've been doubling down on AI stocks lately, and honestly, it's been a wild ride, but the good kind. AI is literally taking over everything: your phone, your doctor's office, even your coffee maker (okay, maybe not yet, but give it time). So I'm putting my money where my mouth is. Here's exactly what I'm holding and why.</p>

            <h3 className="text-xl font-semibold mt-8 mb-4">AI in Everyday Life</h3>
            <p className="mb-6">AI isn't just for tech geeks anymore. It's embedded in our daily lives, from smartphones to smart homes. Here's where I'm betting my portfolio.</p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">🧠 The Big Picture: Why AI Stocks Now?</h2>
            <p className="mb-6">Look, I get it. Everyone's talking about AI, and it feels like we might be in bubble territory. But here's the thing: unlike the dot-com bubble where companies had websites but no revenue, AI companies are actually solving real problems and making real money.</p>
            <p className="mb-6">The AI market is projected to hit <a href="https://www.grandviewresearch.com/industry-analysis/artificial-intelligence-ai-market" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">$1.8 trillion by 2030</a>, and we're still in the early innings. Some projections go even higher. PwC estimates AI could contribute <a href="https://www.pwc.com/gx/en/issues/data-and-analytics/publications/artificial-intelligence-study.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">$15.7 trillion to the global economy by 2030</a>. Think about it: every company needs AI infrastructure, just like every company needed websites in the 2000s. The difference? This time, the infrastructure players are already profitable.</p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">💎 My Core Holdings: The Infrastructure Play</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">1. Micron Technology (MU): The Memory Goldmine 🧠</h3>
            <p className="mb-6">Micron's memory chips are literally the fuel for AI's brain, and demand is going through the roof.</p>
            <p className="mb-6"><b>Why I'm Bullish:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>AI models need insane amounts of memory. We're talking 10x more than traditional computing.</li>
                <li>Every ChatGPT query, every self-driving car scan, every AI recommendation: it all needs high-bandwidth memory (HBM).</li>
                <li>Micron is one of only three companies globally that can make HBM3 chips (SK Hynix leads with 62%, Micron has 21% market share).</li>
                <li>They're sitting on a multi-year supply shortage with pricing power.</li>
            </ul>
            <p className="mb-6"><b>The Numbers:</b> Micron's data center revenue jumped over 400% year-over-year in their latest quarter. They're projecting record revenue of $10.7 billion for Q4 with 15% sequential growth.</p>
            <p className="mb-6"><b>Risk Factor:</b> Memory is cyclical, but AI demand seems to be breaking the traditional cycle patterns. HBM suppliers are essentially sold out through 2024.</p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">2. Canadian Solar (CSIQ): The Power Behind the Power ⚡</h3>
            <p className="mb-6">Data centers are power-hungry beasts, and solar is becoming the cheapest way to feed them.</p>
            <p className="mb-6"><b>The Indirect Play That Makes Sense:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>AI data centers use massive amounts of electricity. Google's data centers alone consumed <a href="https://www.techcrunch.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">30.8 million megawatt-hours in 2024</a>, double their 2020 consumption.</li>
                <li>U.S. data centers consumed about 4.4% of total U.S. electricity in 2023 and could reach <a href="https://www.energy.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">580 TWh annually by 2028</a>.</li>
                <li>Solar is now the cheapest form of new electricity generation in most markets.</li>
                <li>Major tech companies are signing massive solar contracts to power their AI infrastructure.</li>
            </ul>
            <p className="mb-6"><b>Why CSIQ Specifically:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Strong presence in the U.S. market despite being Canadian-Chinese.</li>
                <li>Vertically integrated from manufacturing to project development.</li>
                <li>Completed development of approximately <a href="https://www.recurrentenergy.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">12 GWp of utility-scale solar projects</a>.</li>
                <li>Trading at attractive valuations compared to pure AI plays.</li>
            </ul>
            <p className="mb-6"><b>Recent Catalyst:</b> Microsoft signed a $10+ billion deal with Brookfield for over 10.5 GW of renewable energy, the <a href="https://www.cnbc.com/2024/05/01/microsoft-brookfield-ink-10-billion-plus-renewable-power-deal.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">largest corporate renewable energy deal in history</a>.</p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">3. ASML & SCIA: The Picks and Shovels 🔧</h3>
            <p className="mb-6">ASML's $200+ million EUV machines are the only way to make the most advanced AI chips. Talk about a moat.</p>
            <p className="mb-6"><b>ASML - The Monopoly:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Only company in the world that makes EUV lithography machines.</li>
                <li>These machines are required to make chips smaller than 7nm (all advanced AI chips).</li>
                <li>Costs <a href="https://www.reuters.com/technology/asmls-new-500-mln-euv-machine-is-size-double-decker-bus-2023-12-21/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">$200+ million per machine</a> for standard EUV, $350-400 million for High-NA EUV.</li>
                <li>12-18 month delivery times and a multi-year waiting list.</li>
                <li>Even if AI demand slows, they have a bulletproof backlog.</li>
            </ul>
            <p className="mb-6"><b>SCIA - The Under-the-Radar Play:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Makes specialized equipment for semiconductor manufacturing.</li>
                <li>Much smaller than ASML but growing faster.</li>
                <li>Higher beta play on the semiconductor equipment cycle.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">4. NVIDIA (NVDA): The Obvious King 👑</h3>
            <p className="mb-6">Yeah, I know. Everyone owns NVIDIA. But sometimes the obvious play is obvious for a reason. Here's why I'm still holding despite the massive run-up:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><b>Moat Strength:</b> The CUDA software ecosystem is incredibly sticky. 90% of AI developers use CUDA, creating a massive switching cost.</li>
                <li><b>Scale Advantages:</b> The bigger they get, the more R&D they can fund.</li>
                <li><b>Next-Gen Catalyst:</b> The <a href="https://developer.nvidia.com/blog/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Blackwell chips are delivering a 2.5x performance improvement</a> over the previous generation.</li>
                <li><b>Market Expansion:</b> Moving beyond training into inference, robotics, and autonomous vehicles.</li>
            </ul>
            <p className="mb-6"><b>Position Size:</b> This is my largest single holding, but I'm not adding more at current levels.</p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">📊 My Portfolio Breakdown</h2>
            <div className="my-8">
                <InvestmentPortfolioChart />
            </div>
            <p className="text-sm text-center text-muted-foreground">This is an illustrative portfolio based on the article's thesis, not direct financial advice.</p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">⚠️ My Biggest Risks (And How I'm Hedging)</h2>
            <p className="mb-6">Diversification isn't just about different stocks. It's about different risk factors.</p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Risk #1: The AI Bubble Burst (40% Probability)</h3>
            <p className="mb-6"><b>What Keeps Me Up:</b> Valuations are getting stretched, and we've seen this movie before.<br /><b>My Hedge:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Position sizing: AI is only 30% of my total portfolio.</li>
                <li>Shorting QQQ as a partial hedge against tech selloffs.</li>
                <li>Setting stop-losses at 25% drawdowns for momentum names.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Risk #2: China Tariffs & Trade Wars (30% Probability)</h3>
            <p className="mb-6"><b>The Problem:</b> Most of my plays have China exposure or supply chain risks.<br /><b>My Protection:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Diversified across different geographies (ASML in Netherlands, MU in U.S.).</li>
                <li>Avoiding pure China plays.</li>
                <li>Monitoring trade headlines closely.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Risk #3: Periodic AI Scares (30% Probability)</h3>
            <p className="mb-6"><b>Recent Example:</b> The DeepSeek panic in January 2025 that wiped out over $1 trillion in market cap overnight (<a href="https://edition.cnn.com/business" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CNN Business</a>, <a href="https://www.businessinsider.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Business Insider</a>).<br /><b>My Approach:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>These are buying opportunities, not selling moments.</li>
                <li>Keeping 20% cash to deploy during panics.</li>
                <li>Focusing on infrastructure players who benefit regardless of which AI model wins.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">🎯 My Investment Thesis: Infrastructure Over Applications</h2>
            <p className="mb-6">Here's my core belief: I'd rather own the roads than try to pick which cars will drive on them.</p>
            <p className="mb-6"><b>Why Infrastructure Wins:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><b>Model Agnostic:</b> My stocks benefit whether it's OpenAI, Anthropic, Google, or some unknown startup that wins.</li>
                <li><b>Higher Barriers to Entry:</b> It's easier to build a new AI app than a new chip fab.</li>
                <li><b>Pricing Power:</b> When you control essential infrastructure, you can raise prices.</li>
                <li><b>Longer Investment Cycles:</b> These aren't consumer fads; they're multi-decade infrastructure buildouts.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">📈 What I'm Watching: Key Catalysts Ahead</h2>
            <p className="mb-6"><b>Q1 2025:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>NVIDIA Blackwell chip production ramp and <a href="https://www.bitget.com/news/articles/12560603808409" target="_blank" rel="noopener noreferrer" className="text-primary hover-underline">2.5x performance improvements</a>.</li>
                <li>Micron's HBM3E pricing announcements amid continued supply shortages.</li>
                <li>Data center CapEx guidance from hyperscalers.</li>
            </ul>
            <p className="mb-6"><b>2025 Full Year:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>AI inference market development (where the real money is long-term).</li>
                <li>Energy infrastructure investments by tech giants: data centers could consume <a href="https://www.eesi.org/articles/view/fact-sheet-the-growth-in-data-center-electricity-use" target="_blank" rel="noopener noreferrer" className="text-primary hover-underline">580 TWh by 2028</a>.</li>
                <li>China's response to semiconductor restrictions.</li>
            </ul>
            <p className="mb-6"><b>Long-term (2026+):</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Edge AI deployment (brings manufacturing back to U.S./Europe).</li>
                <li>Autonomous vehicle mass production.</li>
                <li>AI robotics commercialization.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">💡 Final Thoughts: Playing the Long Game</h2>
            <p className="mb-6">Look, I'm not going to sugarcoat it. This is a volatile sector, and I've had plenty of sleepless nights. But I genuinely believe we're witnessing the biggest technological shift since the internet, and I want to be positioned for it.</p>
            <p className="mb-6"><b>My Rules:</b></p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Infrastructure over applications (roads, not cars).</li>
                <li>Companies with moats, not just growth (defensibility matters).</li>
                <li>Position sizing that lets me sleep at night (never bet the farm).</li>
                <li>Long-term thinking with short-term risk management (stop losses exist for a reason).</li>
            </ul>
            <p className="mb-6">The AI revolution is just getting started, but the infrastructure to support it needs to be built now. That's where the money is.</p>

            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg" className="mt-4">Download The Full Guide</Button>
                </DialogTrigger>
                <DialogContent className="bg-background">
                    <DialogHeader>
                        <DialogTitle>Get the Full AI Investment Guide</DialogTitle>
                        <DialogDescription>
                            Enter your details to download the complete guide, including bonus content and stock analysis.
                        </DialogDescription>
                    </DialogHeader>
                    <EnrollmentForm programName="AI Investment Guide" />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ArticleContent;
