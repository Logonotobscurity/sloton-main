
"use client";

import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Image from 'next/image';
import { InvestmentPortfolioChart } from '@/components/investment-portfolio-chart';
import { EnrollmentForm } from '@/components/enrollment-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { insights } from '@/lib/insights';
import imageData from '@/lib/placeholder-images.json';


const investmentArticleContent = `
<p class="mb-6 text-lg text-muted-foreground">I've been doubling down on AI stocks lately, and honestly, it's been a wild ride, but the good kind. AI is literally taking over everything: your phone, your doctor's office, even your coffee maker (okay, maybe not yet, but give it time). So I'm putting my money where my mouth is. Here's exactly what I'm holding and why.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">AI in Everyday Life</h3>
<p class="mb-6">AI isn't just for tech geeks anymore. It's embedded in our daily lives, from smartphones to smart homes. Here's where I'm betting my portfolio.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">🧠 The Big Picture: Why AI Stocks Now?</h2>
<p class="mb-6">Look, I get it. Everyone's talking about AI, and it feels like we might be in bubble territory. But here's the thing: unlike the dot-com bubble where companies had websites but no revenue, AI companies are actually solving real problems and making real money.</p>
<p class="mb-6">The AI market is projected to hit <a href="https://www.grandviewresearch.com/industry-analysis/artificial-intelligence-ai-market" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1.8 trillion by 2030</a>, and we're still in the early innings. Some projections go even higher. PwC estimates AI could contribute <a href="https://www.pwc.com/gx/en/issues/data-and-analytics/publications/artificial-intelligence-study.html" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$15.7 trillion to the global economy by 2030</a>. Think about it: every company needs AI infrastructure, just like every company needed websites in the 2000s. The difference? This time, the infrastructure players are already profitable.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">💎 My Core Holdings: The Infrastructure Play</h2>

<h3 class="text-xl font-semibold mt-8 mb-4">1. Micron Technology (MU): The Memory Goldmine 🧠</h3>
<p class="mb-6">Micron's memory chips are literally the fuel for AI's brain, and demand is going through the roof.</p>
<p class="mb-6"><b>Why I'm Bullish:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>AI models need insane amounts of memory. We're talking 10x more than traditional computing.</li>
    <li>Every ChatGPT query, every self-driving car scan, every AI recommendation: it all needs high-bandwidth memory (HBM).</li>
    <li>Micron is one of only three companies globally that can make HBM3 chips (SK Hynix leads with 62%, Micron has 21% market share).</li>
    <li>They're sitting on a multi-year supply shortage with pricing power.</li>
</ul>
<p class="mb-6"><b>The Numbers:</b> Micron's data center revenue jumped over 400% year-over-year in their latest quarter. They're projecting record revenue of $10.7 billion for Q4 with 15% sequential growth.</p>
<p class="mb-6"><b>Risk Factor:</b> Memory is cyclical, but AI demand seems to be breaking the traditional cycle patterns. HBM suppliers are essentially sold out through 2024.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">2. Canadian Solar (CSIQ): The Power Behind the Power ⚡</h3>
<p class="mb-6">Data centers are power-hungry beasts, and solar is becoming the cheapest way to feed them.</p>
<p class="mb-6"><b>The Indirect Play That Makes Sense:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>AI data centers use massive amounts of electricity. Google's data centers alone consumed <a href="https://www.techcrunch.com/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">30.8 million megawatt-hours in 2024</a>, double their 2020 consumption.</li>
    <li>U.S. data centers consumed about 4.4% of total U.S. electricity in 2023 and could reach <a href="https://www.energy.gov/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">580 TWh annually by 2028</a>.</li>
    <li>Solar is now the cheapest form of new electricity generation in most markets.</li>
    <li>Major tech companies are signing massive solar contracts to power their AI infrastructure.</li>
</ul>
<p class="mb-6"><b>Why CSIQ Specifically:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>Strong presence in the U.S. market despite being Canadian-Chinese.</li>
    <li>Vertically integrated from manufacturing to project development.</li>
    <li>Completed development of approximately <a href="https://www.recurrentenergy.com/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">12 GWp of utility-scale solar projects</a>.</li>
    <li>Trading at attractive valuations compared to pure AI plays.</li>
</ul>
<p class="mb-6"><b>Recent Catalyst:</b> Microsoft signed a $10+ billion deal with Brookfield for over 10.5 GW of renewable energy, the <a href="https://www.cnbc.com/2024/05/01/microsoft-brookfield-ink-10-billion-plus-renewable-power-deal.html" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">largest corporate renewable energy deal in history</a>.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">3. ASML & SCIA: The Picks and Shovels 🔧</h3>
<p class="mb-6">ASML's $200+ million EUV machines are the only way to make the most advanced AI chips. Talk about a moat.</p>
<p class="mb-6"><b>ASML - The Monopoly:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>Only company in the world that makes EUV lithography machines.</li>
    <li>These machines are required to make chips smaller than 7nm (all advanced AI chips).</li>
    <li>Costs <a href="https://www.reuters.com/technology/asmls-new-500-mln-euv-machine-is-size-double-decker-bus-2023-12-21/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$200+ million per machine</a> for standard EUV, $350-400 million for High-NA EUV.</li>
    <li>12-18 month delivery times and a multi-year waiting list.</li>
    <li>Even if AI demand slows, they have a bulletproof backlog.</li>
</ul>
<p class="mb-6"><b>SCIA - The Under-the-Radar Play:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>Makes specialized equipment for semiconductor manufacturing.</li>
    <li>Much smaller than ASML but growing faster.</li>
    <li>Higher beta play on the semiconductor equipment cycle.</li>
</ul>

<h3 class="text-xl font-semibold mt-8 mb-4">4. NVIDIA (NVDA): The Obvious King 👑</h3>
<p class="mb-6">Yeah, I know. Everyone owns NVIDIA. But sometimes the obvious play is obvious for a reason. Here's why I'm still holding despite the massive run-up:</p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li><b>Moat Strength:</b> The CUDA software ecosystem is incredibly sticky. 90% of AI developers use CUDA, creating a massive switching cost.</li>
    <li><b>Scale Advantages:</b> The bigger they get, the more R&D they can fund.</li>
    <li><b>Next-Gen Catalyst:</b> The <a href="https://developer.nvidia.com/blog/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Blackwell chips are delivering a 2.5x performance improvement</a> over the previous generation.</li>
    <li><b>Market Expansion:</b> Moving beyond training into inference, robotics, and autonomous vehicles.</li>
</ul>
<p class="mb-6"><b>Position Size:</b> This is my largest single holding, but I'm not adding more at current levels.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">📊 My Portfolio Breakdown</h2>
<!-- This will be replaced by a proper chart component -->
<div id="portfolio-chart-container" class="my-8"></div>
<p class="text-sm text-center text-muted-foreground">This is an illustrative portfolio based on the article's thesis, not direct financial advice.</p>


<h2 class="text-2xl font-bold mt-12 mb-4">⚠️ My Biggest Risks (And How I'm Hedging)</h2>
<p class="mb-6">Diversification isn't just about different stocks. It's about different risk factors.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">Risk #1: The AI Bubble Burst (40% Probability)</h3>
<p class="mb-6"><b>What Keeps Me Up:</b> Valuations are getting stretched, and we've seen this movie before.<br><b>My Hedge:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>Position sizing: AI is only 30% of my total portfolio.</li>
    <li>Shorting QQQ as a partial hedge against tech selloffs.</li>
    <li>Setting stop-losses at 25% drawdowns for momentum names.</li>
</ul>

<h3 class="text-xl font-semibold mt-8 mb-4">Risk #2: China Tariffs & Trade Wars (30% Probability)</h3>
<p class="mb-6"><b>The Problem:</b> Most of my plays have China exposure or supply chain risks.<br><b>My Protection:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>Diversified across different geographies (ASML in Netherlands, MU in U.S.).</li>
    <li>Avoiding pure China plays.</li>
    <li>Monitoring trade headlines closely.</li>
</ul>

<h3 class="text-xl font-semibold mt-8 mb-4">Risk #3: Periodic AI Scares (30% Probability)</h3>
<p class="mb-6"><b>Recent Example:</b> The DeepSeek panic in January 2025 that wiped out over $1 trillion in market cap overnight (<a href="https://edition.cnn.com/business" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">CNN Business</a>, <a href="https://www.businessinsider.com/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Business Insider</a>).<br><b>My Approach:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>These are buying opportunities, not selling moments.</li>
    <li>Keeping 20% cash to deploy during panics.</li>
    <li>Focusing on infrastructure players who benefit regardless of which AI model wins.</li>
</ul>

<h2 class="text-2xl font-bold mt-12 mb-4">🎯 My Investment Thesis: Infrastructure Over Applications</h2>
<p class="mb-6">Here's my core belief: I'd rather own the roads than try to pick which cars will drive on them.</p>
<p class="mb-6"><b>Why Infrastructure Wins:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li><b>Model Agnostic:</b> My stocks benefit whether it's OpenAI, Anthropic, Google, or some unknown startup that wins.</li>
    <li><b>Higher Barriers to Entry:</b> It's easier to build a new AI app than a new chip fab.</li>
    <li><b>Pricing Power:</b> When you control essential infrastructure, you can raise prices.</li>
    <li><b>Longer Investment Cycles:</b> These aren't consumer fads; they're multi-decade infrastructure buildouts.</li>
</ul>

<h2 class="text-2xl font-bold mt-12 mb-4">📈 What I'm Watching: Key Catalysts Ahead</h2>
<p class="mb-6"><b>Q1 2025:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>NVIDIA Blackwell chip production ramp and <a href="https://www.bitget.com/news/articles/12560603808409" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">2.5x performance improvements</a>.</li>
    <li>Micron's HBM3E pricing announcements amid continued supply shortages.</li>
    <li>Data center CapEx guidance from hyperscalers.</li>
</ul>
<p class="mb-6"><b>2025 Full Year:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>AI inference market development (where the real money is long-term).</li>
    <li>Energy infrastructure investments by tech giants: data centers could consume <a href="https://www.eesi.org/articles/view/fact-sheet-the-growth-in-data-center-electricity-use" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">580 TWh by 2028</a>.</li>
    <li>China's response to semiconductor restrictions.</li>
</ul>
<p class="mb-6"><b>Long-term (2026+):</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>Edge AI deployment (brings manufacturing back to U.S./Europe).</li>
    <li>Autonomous vehicle mass production.</li>
    <li>AI robotics commercialization.</li>
</ul>

<h2 class="text-2xl font-bold mt-12 mb-4">💡 Final Thoughts: Playing the Long Game</h2>
<p class="mb-6">Look, I'm not going to sugarcoat it. This is a volatile sector, and I've had plenty of sleepless nights. But I genuinely believe we're witnessing the biggest technological shift since the internet, and I want to be positioned for it.</p>
<p class="mb-6"><b>My Rules:</b></p>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>Infrastructure over applications (roads, not cars).</li>
    <li>Companies with moats, not just growth (defensibility matters).</li>
    <li>Position sizing that lets me sleep at night (never bet the farm).</li>
    <li>Long-term thinking with short-term risk management (stop losses exist for a reason).</li>
</ul>
<p class="mb-6">The AI revolution is just getting started, but the infrastructure to support it needs to be built now. That's where the money is.</p>

<div id="download-guide"></div>
`;

const llmsTxtArticleContent = `
<p class="mb-6 text-lg text-muted-foreground">SEO is shifting fast, and a quiet change is gaining traction: the <code>llms.txt</code> file. This simple text file sits on your website and helps AI systems—like chatbots and search tools—understand what your content is about.</p>
<p class="mb-6">Think of it as a guide written for machines. While traditional websites are built with humans in mind, an <code>llms.txt</code> file gives AI a cleaner, clearer version of your most important pages. It helps models pick up context faster, reduce confusion, and get the right information in front of the right people.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">What is LLMs.txt?</h2>
<p class="mb-6"><code>LLMs.txt</code> is a new proposed web standard designed to help large language models (LLMs)—like ChatGPT, Claude, or Gemini—easily understand your website by providing detailed information about its most important pages.</p>
<p class="mb-6">Think of it like a custom guidebook for AI. While <code>robots.txt</code> controls what bots can crawl and <code>sitemap.xml</code> lists your pages, <code>LLMs.txt</code> tells AI which pages actually matter, and why. It’s a human-readable and AI-friendly Markdown file that lives at the root of your website.</p>
<p class="mb-6">For SaaS companies and content-heavy websites, implementing <code>LLMs.txt</code> can improve AI visibility, drive better citations, and improve user engagement.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">Why LLM matters for SEO</h2>
<div class="my-8 flex justify-center">
    <div id="llms-diagram-container"></div>
</div>
<p class="mb-6">As AI-powered search engines become more important, <code>LLMs.txt</code> is turning into a key tool for helping websites work better with large language models (LLMs). Here’s why <code>llms.txt</code> files matter for SEO strategies:</p>
<ul class="list-disc pl-6 space-y-3 mb-6">
    <li><strong>Better visibility in AI search:</strong> Guides AI models to prioritize your key information, increasing the chances of being referenced in AI-generated responses.</li>
    <li><strong>Ensures accurate AI citations:</strong> Helps control what AI says about your business by highlighting the relevant information for both AI systems and human readers.</li>
    <li><strong>Works alongside traditional SEO:</strong> Complements <code>robots.txt</code> and sitemaps by directing AI models to your most valuable pages and acting as an additional index for machine-readable content.</li>
    <li><strong>Easy to implement:</strong> It’s just a simple Markdown file you upload to your site, and you can even include links to additional resources for context.</li>
    <li><strong>Drives more referral traffic:</strong> Boosts AI citations, leading to more organic visits from AI-generated answers.</li>
    <li><strong>Future-proofs your website:</strong> Prepares your site for the rise of AI-powered search, giving you a competitive edge.</li>
</ul>

<h2 class="text-2xl font-bold mt-12 mb-4">How large language models (LLMS) work</h2>
<div class="my-8 flex justify-center">
    <div id="how-llms-work-container"></div>
</div>
<p class="mb-6"><code>LLMs.txt</code> gives AI a simplified, structured version of your most important content. It highlights your top pages and provides short descriptions for each, helping models utilize web content more effectively—much like how search engines crawl and interpret websites. Here’s a simplified breakdown of how large language models work:</p>
<ul class="list-disc pl-6 space-y-3 mb-6">
    <li><strong>Trained on massive data sets:</strong> LLMs process textual data from books, websites, and other sources to learn language patterns and utilize web content effectively.</li>
    <li><strong>Use deep learning & neural networks:</strong> They rely on generative pre-trained transformer models (like GPT and Claude) to predict and generate text based on context, requiring a deep understanding of programming languages and structured HTML pages.</li>
    <li><strong>Understand context & meaning:</strong> By analyzing sentence structures, relationships between words, and user prompts, LLMs generate relevant responses—especially when guided by a properly formatted <code>txt</code> file like <code>LLMs.txt</code> placed at your site’s root path.</li>
    <li><strong>Limitations & token vocabulary constraints:</strong> LLMs have a fixed memory (token limit), meaning they can’t process unlimited data in one go and prioritize the most relevant indexable pages. This makes it even more important to highlight the following sections clearly within your content.</li>
    <li><strong>Continuously improve with human feedback:</strong> Models refine their outputs through reinforcement learning, user interactions, and training data.</li>
    <li><strong>Generate content, summarize, and analyze:</strong> LLMs can generate human-like text and create articles, answer questions, translate text, and extract key insights from complex tasks. This content creation is changing many business processes and introduces new dimensions to search engine optimization.</li>
</ul>
<p class="mb-6">Understanding how LLMs work helps you optimize web content for AI-driven search, ensuring AI automatically generates relevant responses and extracts the right context from your site.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">How to optimize your content for AI readability</h2>
<p class="mb-6">Google, ChatGPT, and AI search engines extract, summarize, and display web content based on structure, clarity, and format. If you’re still not appearing in AI results, then you need to optimize your website for AI readability—making sure your important information is easy for models to find and understand—using the tips mentioned below:</p>
<ul class="list-disc pl-6 space-y-3 mb-6">
    <li><strong>Clear headings & structure:</strong> Use clear headings like H1, H2, H3, and include bullet points to organize content, especially if your site contains complex HTML. This helps AI assistants easily navigate and interpret your pages.</li>
    <li><strong>AI-readable tables:</strong> For comparisons, use structured tables that provide additional context and make it easier for AI to extract key information from your content.</li>
    <li><strong>FAQ sections & schema markup:</strong> Include FAQ sections and apply schema markup to improve your chances of being featured in Google search results and help AI index your site more effectively.</li>
    <li><strong>Simple, direct language:</strong> Use simple and direct language instead of complex jargon to improve AI’s comprehension and boost your SEO performance.</li>
    <li><strong>Internal linking:</strong> Internal linking helps AI understand the relationships between different pieces of content on your site, enhancing its ability to rank your pages accurately.</li>
    <li><strong>Optimized metadata:</strong> Optimize your titles and descriptions in your metadata to significantly influence how AI algorithms rank and display your content in search results. For example, properly formatted content that follows these guidelines is more likely to be favored by AI-driven search tools.</li>
</ul>

<h2 class="text-2xl font-bold mt-12 mb-4">What’s inside an LLMs.txt file</h2>
<p class="mb-6">Here’s what a basic structure looks like:</p>
<pre class="bg-secondary/50 p-4 rounded-md overflow-x-auto"><code># AcmeCorp

> AcmeCorp builds privacy-first analytics tools for SaaS businesses.

## Docs
– [Getting Started Guide](https://acmecorp.com/docs/start): Intro for developers
– [API Reference](https://acmecorp.com/docs/api): Complete API documentation

## Tutorials
– [Build a dashboard in 5 minutes](https://acmecorp.com/tutorials/dashboard): Step-by-step walkthrough
– [Analytics for non-technical teams](https://acmecorp.com/tutorials/non-tech): Explains key metrics and terms

## Blog
– [Why privacy matters](https://acmecorp.com/blog/privacy): A thought leadership piece
– [Case study: How we scaled to 1M users](https://acmecorp.com/blog/scaling): Lessons from our growth story

## Optional
– [Terms of Service](https://acmecorp.com/terms): Legal information
– [Community Forum](https://acmecorp.com/forum): Peer support and discussion</code></pre>

<h2 class="text-2xl font-bold mt-12 mb-4">How to create your own LLMs.txt file</h2>
<p class="mb-6">Setting up an <code>LLMs.txt</code> file is simple, but doing it right ensures AI models recognize and prioritize your most important information. This helps AI accurately index your site and surface the content that matters most. Follow these steps to create and implement your own <code>LLMs.txt</code> file:</p>
<ol class="list-decimal pl-6 space-y-4 mb-6">
    <li>
        <h3 class="text-lg font-semibold">Define your objective</h3>
        <p>Decide which content you want AI models to focus on. For example:</p>
        <ul class="list-disc pl-6 mt-2 space-y-1">
            <li>A SaaS platform may highlight onboarding guides and product documents.</li>
            <li>A blog-focused site might spotlight cornerstone articles and explainers.</li>
            <li>An e-commerce brand could feature key product categories or buyer’s guides.</li>
        </ul>
    </li>
    <li>
        <h3 class="text-lg font-semibold">Map your content</h3>
        <p>Categorize content into sections, such as “Product Information,” “Case Studies,” or “Help Docs.” Structure it in a way that makes it easy for AI models to process. Make a list of high-value URLs. Skip pages like /login, /cart, /privacy-policy.</p>
        <p class="mt-2"><strong>Example for a SaaS company:</strong></p>
        <pre class="bg-secondary/50 p-2 rounded-md text-sm mt-1"><code>/docs/start
/docs/api
/tutorials/integrate-slack
/pricing
/case-studies/team-growth</code></pre>
        <p class="mt-2"><strong>Example for a content-heavy blog:</strong></p>
        <pre class="bg-secondary/50 p-2 rounded-md text-sm mt-1"><code>/blog/how-to-use-ai-in-content-marketing
/blog/seo-for-ai-search
/resources/checklists/content-brief-template</code></pre>
    </li>
    <li>
        <h3 class="text-lg font-semibold">Write it in Markdown</h3>
        <p>Use a simple Markdown-style format. Include links, short descriptions, and keywords for clarity. Structure the file like this:</p>
        <pre class="bg-secondary/50 p-4 rounded-md overflow-x-auto text-sm mt-2"><code># Project Name

> Short summary of your company or purpose.

## Section name
– [Page title](url): 1-sentence summary of what the page offers</code></pre>
        <p class="mt-2">Use multiple sections (like Docs, Blog, Examples) to keep it organized. Include only the most useful links in each.</p>
    </li>
    <li>
        <h3 class="text-lg font-semibold">Save and upload</h3>
        <ul class="list-disc pl-6 mt-2 space-y-1">
            <li>Save it as <code>llms.txt</code></li>
            <li>Upload it to the root directory of your site (e.g., https://yourwebsite.com/llms.txt)</li>
            <li>You can also create a longer version, <code>llms-full.txt</code>, which includes full documentation content (optional)</li>
        </ul>
    </li>
</ol>


<h2 class="text-2xl font-bold mt-12 mb-4">How to add LLMs.txt file to WordPress</h2>
<p class="mb-6">Adding an <code>LLMs.txt</code> file to WordPress is straightforward, especially with the help of plugins. Here’s how you can do it:</p>
<ol class="list-decimal pl-6 space-y-4 mb-6">
    <li><strong>Install an LLMs.txt plugin:</strong> Download a plugin such as “LLMs.txt for WP” or “Website LLMs.txt” from the WordPress plugin repository or GitHub. Navigate to your WordPress dashboard and go to Plugins > Add New > Upload Plugin. Upload the plugin ZIP file, then activate it.</li>
    <li><strong>Configure the plugin settings:</strong> After activation, go to Settings > LLMs.txt Settings in your WordPress admin panel. Select the pages, posts, or custom post types you want to include in the <code>LLMs.txt</code> file. You can also set limits on the number of posts or pages to include.</li>
    <li><strong>Generate and access the file:</strong> The plugin will automatically generate the <code>LLMs.txt</code> file and place it in your site’s root directory (e.g., https://yourwebsite.com/llms.txt). Visit this URL to confirm that the file is correctly formatted and accessible by AI crawlers.</li>
    <li><strong>Optional: enable markdown support:</strong> Some plugins allow you to enable Markdown versions of your posts by appending <code>.md</code> to URLs (e.g., https://yourwebsite.com/your-post.md).</li>
</ol>
<p class="mb-6">By using these plugins, you can easily manage and update your <code>LLMs.txt</code> file without any coding knowledge.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">How to add LLMs.txt file to Webflow</h2>
<p class="mb-6">To add an <code>/llms.txt</code> file to your Webflow website, you’ll need to upload the file to Webflow’s asset manager, then create a 301 redirect from the <code>/llms.txt</code> URL to the uploaded file’s URL. Here’s a step-by-step guide:</p>
<ol class="list-decimal pl-6 space-y-4 mb-6">
    <li><strong>Create and upload the /llms.txt file:</strong> Create a text file named <code>llms.txt</code> containing the information you want to provide to LLMs. Go to the Webflow designer, open the “Assets” panel, and upload your <code>llms.txt</code> file.</li>
    <li><strong>Get the asset URL:</strong> Find the uploaded <code>llms.txt</code> file in the Assets panel. Right-click on the file and select “Open in browser” to get the URL of the uploaded file.</li>
    <li><strong>Create a 301 redirect:</strong> Go to Project Settings in the Webflow designer, click on “Project Settings”. Go to the “Hosting” tab. Click on “Add Redirect” and create a new 301 redirect. Set the redirect from: Enter <code>/llms.txt</code>. To: Paste the URL of the uploaded <code>llms.txt</code> file (obtained in step 2). Type: Choose “301 Permanent Redirect”. Save the redirect settings.</li>
    <li><strong>Publish your website:</strong> Publish your Webflow website to make the changes live.</li>
    <li><strong>(Optional) Add an HTTP header:</strong> To clarify the file’s purpose, add: <code>X-Robots-Tag: llms-txt</code></li>
    <li><strong>Test it:</strong> Open https://yourwebsite.com/llms.txt to check formatting. Copy the contents into ChatGPT or Claude and ask, “What does this company do?” See how accurately AI understands your business.</li>
</ol>
<p class="mb-6"><strong>Important Notes:</strong> Webflow users don’t have direct access to the root directory, so this method uses redirects to simulate it. Ensure the file is uploaded to the Webflow assets and not just linked to. After implementing, test that the <code>/llms.txt</code> file is accessible at the correct URL.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">Tools to generate your file</h2>
<div class="my-8 flex justify-center">
    <div id="tools-generating-docs-container"></div>
</div>
<p class="mb-6">Creating an <code>LLMs.txt</code> file manually is simple, but using the right tools can speed up the process and ensure accuracy, ultimately enhancing model performance. Here are some useful tools to help you generate and manage your <code>LLMs.txt</code> file:</p>
<ul class="list-disc pl-6 space-y-3 mb-6">
    <li><strong>Firecrawl Generator:</strong> An AI-powered tool that helps parse complex HTML and structure <code>LLMs.txt</code> automatically. It scrapes your site much like how search engines crawl, suggesting the most relevant pages for AI indexing and building a comprehensive file.</li>
    <li><strong>Dotenv llmstxt:</strong> Ideal for developers looking to integrate <code>LLMs.txt</code> management into their workflows and development environments. It automates content updates based on changes in your CMS and automatically generates <code>llms.txt</code> from <code>sitemap.xml</code>, ensuring detailed information is always up to date.</li>
    <li><strong>Mintlify:</strong> Best for documentation-heavy websites, ensuring AI models and AI tools can access structured knowledge bases. It auto-generates <code>llms.txt</code> from your existing files, optimizing content for the limited context window of large language models.</li>
    <li><strong>WordPress Plugin:</strong> If your site runs on WordPress, some SEO plugins now offer <code>LLMs.txt</code> integration, letting you manage AI-specific indexing directly from your admin panel.</li>
    <li><strong>Custom scripts & automation:</strong> For a tailored approach, create scripts to dynamically update <code>LLMs.txt</code>—especially useful for large SaaS platforms where content changes frequently.</li>
</ul>
<p class="mb-6">Using these tools, you can efficiently create, update, and optimize your LLMs txt file, helping AI models understand and prioritize your content for accurate answers and better visibility.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">Best practices</h2>
<div class="my-8 flex justify-center">
    <div id="seo-checklist-container"></div>
</div>
<p class="mb-6">To make the most of your <code>LLMs.txt</code> file, follow these best practices to ensure AI models can easily process and prioritize your content.</p>
<ul class="list-disc pl-6 space-y-3 mb-6">
    <li><strong>Start with the essentials:</strong> Only include pages that provide real value to users or showcase your expertise, such as programming documentation or key resources. Skip outdated, low-quality, or irrelevant content to respect the context window limitations of AI models.</li>
    <li><strong>Use clear, concise descriptions:</strong> Keep descriptions short and to the point—1–2 sentences max. Avoid jargon unless it’s widely understood in your industry or by AI tools.</li>
    <li><strong>Organize with H2 sections:</strong> Structure your <code>LLMs.txt</code> file by content type (e.g., Docs, Blog, Case Studies, Features) in a specific order. This makes it easier for AI models to go through your website and navigation menus to find the most important content. Consider using two files if your site has a broad range of content—for example, one file for core pages and another for supplemental materials.</li>
    <li><strong>Keep it updated:</strong> Review and update your domain-specific <code>LLMs</code> files at least once a quarter, especially after major content updates, new product launches, or significant site changes.</li>
    <li><strong>Use the “Optional” section wisely:</strong> Place secondary content like changelogs, terms of service, or community pages there. This helps AI models prioritize core content while still referencing less critical pages when needed.</li>
</ul>
<p class="mb-6">Following these best practices ensures your <code>LLMs.txt</code> file stays clean, well formatted, and AI-friendly—improving your chances of being cited with accurate answers in AI-generated responses.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">How AI models use LLMs.txt</h2>
<p class="mb-6">Currently, AI models don’t automatically detect <code>LLMs.txt</code> files, meaning you need to manually introduce them to Artificial Intelligence tools. Here’s how you can use them effectively:</p>
<h3 class="text-xl font-semibold mt-8 mb-4">With ChatGPT or Claude:</h3>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>Paste the <code>LLMs.txt</code> content or upload the file directly into the chat.</li>
    <li>Ask targeted questions like: “What are AcmeCorp’s main services?” to guide AI responses based on your curated content.</li>
</ul>
<h3 class="text-xl font-semibold mt-8 mb-4">With Cursor:</h3>
<ul class="list-disc pl-6 space-y-2 mb-6">
    <li>Add the file to your AI workspace via the <code>@Docs</code> feature.</li>
    <li>AI will then reference it when generating responses, keeping your content in context.</li>
</ul>
<p class="mb-6">As LLMs adoption grows, AI tools may start automatically parsing <code>LLMs.txt</code> when available, making it a crucial part of future AI-driven search and content discovery.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">Real-world examples</h2>
<p class="mb-6">Many companies are already using <code>LLMs.txt</code> to improve how AI models interact with their content. Here are some real-world examples:</p>
<ul class="list-disc pl-6 space-y-3 mb-6">
    <li><strong>Anthropic:</strong> Uses <code>LLMs.txt</code> to help AI models understand its API and prompt library, ensuring accurate AI-generated responses.</li>
    <li><strong>Perplexity:</strong> Maintains a comprehensive <code>llms-full.txt</code> file for deep indexing of its help center, making its content more accessible to AI tools.</li>
    <li><strong>Cloudflare:</strong> Leverages <code>LLMs.txt</code> to direct AI toward thousands of developer documentation pages, improving discoverability.</li>
    <li><strong>Mintlify:</strong> Automates <code>LLMs.txt</code> creation for all the documentation it hosts, ensuring AI models always reference the latest information.</li>
</ul>
<p class="mb-6">These examples show how <code>LLMs.txt</code> is already playing a key role in AI-first content optimization, helping businesses improve AI visibility and ensure accurate information retrieval.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">Conclusion</h2>
<p class="mb-6"><code>LLMs.txt</code> is a small yet powerful file that can dramatically boost your website’s presence across AI-driven search platforms. With just a simple HTML or text format, this file gives language models direct access to your most important documents, making it easier for them to understand your content and deliver more accurate results in AI tools like Google’s AI Overviews or ChatGPT.</p>
<p class="mb-6">By listing your key URLs and organizing them by content type (e.g., Docs, Blog, Case Studies), <code>LLMs.txt</code> reduces AI inference time, helping models find relevant information faster. It also eliminates the guesswork, providing systems with the context they need for smarter indexing and better responses.</p>
<p class="mb-6">If your site includes a wide range of content, consider using two files—one for core pages and another for supplemental materials—to improve structure and clarity.</p>
<p class="mb-6">The best part? Setting up <code>LLMs.txt</code> takes less than an hour. It’s a fast, low-effort upgrade that future-proofs your SEO strategy in a world where AI access and retrieval are becoming the new standard for search.</p>

<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-8">
  <p><strong>Related:</strong> <a href="/insights/10-content-formats-that-get-picked-up-by-llms" class="text-primary hover:underline">10 Content Formats That Get Picked Up by LLMs</a></p>
</blockquote>

<h2 class="text-2xl font-bold mt-12 mb-4">FAQS</h2>
<h3 class="text-xl font-semibold mt-8 mb-4">What are foundation models, and why are they important for LLMs?</h3>
<p class="mb-6">Foundation models are large-scale machine learning systems trained on vast datasets across the internet, including websites, documents, and code repositories. These models power large language models (LLMs), enabling them to handle a wide range of tasks like text generation, code completion, and data analysis. Their ability to generalize across domains makes them foundational to AI assistants and generative AI tools that support modern business use cases.</p>
<h3 class="text-xl font-semibold mt-8 mb-4">How does fine-tuning improve the performance of large language models?</h3>
<p class="mb-6">Fine-tuning allows businesses to adapt pre-trained LLMs using their own content—such as internal docs, product pages, or customer service chats. By introducing company-specific data, you expand the model’s context window with domain-relevant knowledge. This ensures more relevant and accurate outputs, whether for generating helpdesk responses or assisting users navigating technical documentation.</p>
<h3 class="text-xl font-semibold mt-8 mb-4">What is generative AI, and how does it relate to SEO?</h3>
<p class="mb-6">Generative AI produces content—text, visuals, or code—based on user input. In SEO, it plays a key role in content creation and optimization. AI can write copy that aligns with search intent, structure site content for discoverability, or help generate structured files like <code>LLMs.txt</code> that improve visibility in AI-driven search engines such as Google. These files guide AI assistants by pointing them to high-priority URLs and page types.</p>
<h3 class="text-xl font-semibold mt-8 mb-4">How does artificial intelligence impact modern SEO strategies?</h3>
<p class="mb-6">AI is reshaping how content is found and ranked. Instead of relying solely on traditional search signals, AI-powered tools now favor clear structure, readable HTML format, accurate sources, and relevance to user queries. Features like <code>LLMs.txt</code> help by giving AI systems a map of your site’s most important content—such as navigation menus, landing pages, or support docs—enhancing retrieval accuracy and boosting organic traffic.</p>
<h3 class="text-xl font-semibold mt-8 mb-4">How do large language models generate text?</h3>
<p class="mb-6">LLMs use transformer-based architectures to analyze context from input prompts and predict the most likely next token in a sequence. This prediction-based generation allows them to produce human-like responses for tasks ranging from article drafting to code generation. The size of their context window—how much input they can process at once—plays a key role in the quality and coherence of their output.</p>
<h3 class="text-xl font-semibold mt-8 mb-4">What business applications can benefit from using LLMs.txt?</h3>
<p class="mb-6">Any site that wants to be better understood by AI models can benefit from an <code>LLMs.txt</code> file. For example, a SaaS platform could use it to highlight onboarding guides, docs, product manuals, or support pages. To improve structure and clarity, you can create two versions of the file—one for core pages and another for supplemental materials—organizing them into clearly labeled file lists. This format ensures that AI tools can efficiently navigate your content and access the most relevant information, improving both inference and discovery.</p>
<h3 class="text-xl font-semibold mt-8 mb-4">Can large language models assist with code generation?</h3>
<p class="mb-6">Yes. LLMs are widely used in development workflows to generate, refactor, or debug code. By analyzing vast programming datasets—including code embedded in HTML, APIs, and scripts published across the web—they can produce functional snippets in multiple languages. Many developer platforms now integrate AI assistants that pull context from a website’s structure or URLs, helping teams enhance productivity, reduce errors, and accelerate software development cycles.</p>
`;

const seoVsGeoArticleContent = `
<p class="mb-6 text-lg text-muted-foreground">Search isn’t what it used to be. While Google is still the dominant player, more people are turning to tools like ChatGPT, Perplexity, and Google’s SGE (Search Generative Experience) for quick, AI-generated answers. Instead of scanning links, users are asking questions and expecting summaries, citations, and clear takeaways right away.</p>
<p class="mb-6">That shift is giving rise to a new approach to content visibility: Generative Engine Optimization (GEO). Unlike traditional SEO, which focuses on ranking in search engines, GEO makes your content useful and accessible to AI tools that generate answers.</p>
<p class="mb-6">In this post, we’ll break down what GEO is, how it compares to traditional SEO, and what strategies actually work if you want your content to show up in AI-driven search engines.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">What is Generative Engine Optimization (GEO)?</h2>
<p class="mb-6">Generative Engine Optimization (GEO) is the process of optimizing content to make it prioritized, cited, and integrated into AI-driven search engines’ responses. The goal is to make content highly relevant and accessible for generative AI to include in its synthesized answers.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">How GEO works in the context of AI-driven searches</h3>
<p class="mb-6">Generative AI platforms rely on large language models (LLMs) trained on vast datasets to generate direct, conversational answers. When users input queries, these systems:</p>
<ul class="list-disc pl-6 space-y-3 mb-6">
    <li><strong>Analyze intent:</strong> They interpret the user’s intent beyond simple keyword matching.</li>
    <li><strong>Synthesize information:</strong> The AI scans its indexed data or real-time web sources, extracts relevant information, and generates a cohesive response.</li>
    <li><strong>Prioritize content:</strong> Content that is clear, well-structured, and authoritative is more likely to be cited or featured in these AI-generated answers.</li>
</ul>
<p class="mb-6">GEO makes sure your content aligns with these systems’ preferences by focusing on clarity, relevance, and structured data formats.</p>
<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-8">
  <p><strong>Dig deeper:</strong> <a href="/insights/why-llms-txt-matters-for-seo" class="text-primary hover:underline">LLMs.txt Files: The New SEO Hack for AI-Powered Search</a></p>
</blockquote>

<h2 class="text-2xl font-bold mt-12 mb-4">Examples: How content appears in generative AI research platforms</h2>
<p class="mb-6"><strong>ChatGPT:</strong> If optimized effectively, your content might be directly quoted or summarized when users search for specific topics like “best digital marketing strategies.”</p>
<div class="my-8 flex justify-center">
    <div id="chat-gpt-example"></div>
</div>
<p class="mb-6"><strong>Perplexity:</strong> Your content could be highlighted as a trusted source when users select specific focus modes such as “Academic Focus” for scholarly insights or “Web Focus” for general information.</p>
<div class="my-8 flex justify-center">
    <div id="perplexity-example"></div>
</div>
<p class="mb-6"><strong>Gemini & Google AI Overviews:</strong> Your content might appear as part of a multimodal response that combines text with supplementary visuals or videos for richer user engagement.</p>
<div class="my-8 flex justify-center">
    <div id="gemini-example"></div>
</div>

<h2 class="text-2xl font-bold mt-12 mb-4">What is traditional SEO?</h2>
<p class="mb-6">Traditional SEO strategy refers to the foundational practices used to improve a website’s visibility and rankings on search engine results pages (SERPs). Its primary goal is to attract organic traffic by optimizing various elements of a website, such as relevant keywords, content, and technical aspects, while building authority through backlinks. Traditional SEO relies on aligning content with user intent and search engine algorithms for relevance and credibility.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">How traditional SEO works</h3>
<p class="mb-6">Traditional SEO operates through a combination of on-page, off-page, and technical optimization techniques:</p>
<ul class="list-disc pl-6 space-y-3 mb-6">
    <li><strong>On-page optimization:</strong> Keyword research, content creation, and crafting optimized title tags and meta descriptions.</li>
    <li><strong>Off-page optimization:</strong> Acquiring backlinks from reputable websites to boost domain authority and credibility.</li>
    <li><strong>Technical SEO:</strong> Ensuring fast load times, mobile responsiveness, and using structured data to help search engines understand content.</li>
</ul>

<h2 class="text-2xl font-bold mt-12 mb-4">GEO vs SEO: Key differences</h2>
<div class="my-8 flex justify-center">
    <div id="seo-vs-geo-diagram"></div>
</div>
<div class="overflow-x-auto">
    <table class="w-full text-left border-collapse my-8">
      <thead>
        <tr>
          <th class="border-b-2 p-4 font-semibold text-primary">Aspect</th>
          <th class="border-b-2 p-4 font-semibold text-primary">Traditional SEO</th>
          <th class="border-b-2 p-4 font-semibold text-primary">Generative Engine Optimization (GEO)</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="p-4 font-semibold">Target platforms</td>
          <td class="p-4">Traditional search engines (Google, Bing)</td>
          <td class="p-4">AI-driven platforms (Google SGE, ChatGPT, Perplexity, Gemini)</td>
        </tr>
        <tr class="border-b">
          <td class="p-4 font-semibold">Primary goal</td>
          <td class="p-4">Improve rankings on SERPs to drive organic traffic</td>
          <td class="p-4">Content is cited or featured in AI-generated answers</td>
        </tr>
        <tr class="border-b">
            <td class="p-4 font-semibold">Optimization focus</td>
            <td class="p-4">Keywords, backlinks, meta tags, and technical SEO</td>
            <td class="p-4">Content structure, E-E-A-T, contextual relevance, and AI readability</td>
        </tr>
         <tr class="border-b">
            <td class="p-4 font-semibold">Key metrics</td>
            <td class="p-4">Traffic volume, keyword rankings, CTR</td>
            <td class="p-4">Inclusion in AI responses, citation frequency, response accuracy</td>
        </tr>
        <tr class="border-b">
            <td class="p-4 font-semibold">Content approach</td>
            <td class="p-4">Keyword-rich, in-depth articles optimized for human readers</td>
            <td class="p-4">Clear, scannable answers with citations, stats, and structured data</td>
        </tr>
      </tbody>
    </table>
</div>


<h2 class="text-2xl font-bold mt-12 mb-4">Top 5 GEO optimization strategies</h2>
<p class="mb-6">GEO requires a tailored approach to make your content accessible, relevant, and prioritized by AI-driven platforms. Below are key strategies to optimize for GEO effectively:</p>
<ol class="list-decimal pl-6 space-y-4 mb-6">
    <li><strong>Get cited with content that AI can reference:</strong> Focus on credibility by including well-researched data, authoritative quotes, and statistics. Make sure your content demonstrates Experience, Expertise, Authority, and Trustworthiness (E-E-A-T).</li>
    <li><strong>Use structured data and clear headers:</strong> Use schema markup to highlight key elements like FAQs, and organize content with clear headings to improve readability for both users and AI systems.</li>
    <li><strong>Fix content structure with summaries and FAQs:</strong> Start with concise summaries that provide quick insights. Answer specific, high-intent questions using a Q&A format.</li>
    <li><strong>Prioritize topical authority and clarity:</strong> Build depth in your niche by creating pillar content and supporting cluster articles. Use simple, conversational language that aligns with natural user queries.</li>
    <li><strong>Publish on trusted, crawlable platforms:</strong> Host your content on well-maintained, easily crawlable websites. Regularly update your content to stay relevant.</li>
</ol>

<h2 class="text-2xl font-bold mt-12 mb-4">Conclusion</h2>
<p class="mb-6">The rise of AI-driven search necessitates a shift towards GEO. It focuses on optimizing content for AI platforms by ensuring it is credible, well-structured, and easily accessible. While traditional SEO remains important, integrating GEO strategies is crucial to maintain visibility and enhance credibility in this new era of search.</p>
<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-8">
  <p><strong>Related:</strong> <a href="/insights/10-content-formats-that-get-picked-up-by-llms" class="text-primary hover:underline">10 Content Formats That Get Picked Up by LLMs</a></p>
</blockquote>
`;

const tenFormatsArticleContent = `
<p class="mb-6 text-lg text-muted-foreground">These days, a lot of people aren’t Googling for answers, they’re asking LLMs like ChatGPT, and getting instant, summarized advice right in the chat. That means your content doesn’t always have to rank #1 in Google anymore to get seen. If an LLM picks it up and uses it in an answer you get visibility anyway. Sometimes even more than you would from a traditional blog click.</p>
<p class="mb-6">But LLMs aren’t quoting just anything. They pull content that’s clear, genuinely useful, easy to summarize, and structured for AI-first indexing. If your content checks those boxes, you’re way more likely to get cited, mentioned, and discovered by new customers.</p>
<p class="mb-6">In this post, I’ll walk you through 10 content formats that LLMs actually like and how to use them to get your brand in ChatGPT answers. Let’s get into it.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">Top content formats to get featured in LLM answers</h2>
<p class="mb-6">Not all content is LLM-friendly but some formats consistently show up in AI answers. Here are a few you should definitely be using on your SaaS site if you want more visibility without fighting for the top spot in Google.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">1. Original research & data-driven content</h3>
<p class="mb-6">LLMs prefer fresh data. If you’ve got unique stats, benchmarks, or survey results, you’re sitting on a goldmine. If you’ve got access to your industry usage data, customer trends, or can run a quick survey, share it! Publish your findings as a blog post, a report, or even a simple chart. This kind of content gets picked up because it’s both useful and hard to find anywhere else.</p>
<div class="my-8 flex justify-center">
    <div id="data-analytics-dashboard-container"></div>
</div>
<p class="mb-6"><strong>Why LLMs pick it up:</strong> AI looks for facts that stand out. If your site is the source of a stat or trend, that makes you quote-worthy.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">2. Expert quotes & professional insights</h3>
<p class="mb-6">LLMs are surprisingly good at spotting fluff – and they’ll skip right over your generic “thought leadership” if it sounds like everyone else. LLMs are looking for expert takes that are backed by real experience or offer a contrarian (but logical) viewpoint. Plus, memorable opinions make your brand stick in people’s minds.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">3. Step-by-step how-to guides</h3>
<p class="mb-6">LLMs prefer structure. Numbered steps, short sentences, bullet points, and clear headings make your content easy to read and easy for AI to summarize. Whether it’s onboarding, troubleshooting, or a process breakdown, actionable guides are exactly what users (and LLMs) want when they’re trying to solve a problem.</p>
<div class="my-8 flex justify-center">
    <div id="workflow-diagram-container"></div>
</div>

<h3 class="text-xl font-semibold mt-8 mb-4">4. Comparison posts (X vs Y)</h3>
<p class="mb-6">People love asking LLMs to compare tools, features, and approaches before making a decision – “X vs Y,” “Is A better than B,” “What’s the difference between X and Z.” If you’ve got clear, side-by-side breakdowns, you’re already ahead. But if your post is too salesy or biased, LLMs will skip over you. Focus more on clarity and less on hype.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">5. Q&A and FAQ pages</h3>
<p class="mb-6">You don’t need a separate FAQ page. Just work questions into your blog posts, product pages, or help docs, and answer them clearly. LLMs are trained to spot and answer questions, so the more your content mirrors how people actually ask, the better your chances of being featured in AI answers.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">6. Case studies & success stories</h3>
<p class="mb-6">LLMs prefer to cite real scenarios because it adds credibility to their answers. Even simple before-and-after examples can work wonders, as long as they’re clear, focused, and actually prove a point. Case studies give your content that real-world weight most blogs don’t have.</p>
<div class="my-8 flex justify-center">
    <div id="financial-data-container"></div>
</div>

<h3 class="text-xl font-semibold mt-8 mb-4">7. Lists, tables, and summaries</h3>
<p class="mb-6">If there’s one thing both readers and LLMs appreciate, it’s content that’s easy to skim. Lists, tables, and TL;DRs make your posts more digestible and easier to quote. Summaries or recap boxes at the top or bottom of your posts give LLMs easy info to grab and cite. Lists and tables break down info so it’s quick to scan, compare, and share.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">8. Checklists and cheat sheets</h3>
<p class="mb-6">Checklists and cheat sheets are easy to skim for LLMs. You can easily break down detailed topics. They’re practical, actionable, and get easily featured into an AI-generated answer.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">9. Schema markup & structured data (JSON-LD, XML)</h3>
<p class="mb-6">Producing great content is not enough, you need to format it properly. Schema markup and structured data help both LLMs and search engines “read” your content more easily.</p>

<h3 class="text-xl font-semibold mt-8 mb-4">10. Multimodal content (infographics, videos, audio)</h3>
<p class="mb-6">Text isn’t the only thing LLMs are learning to understand. Models are getting better at picking up cues from images, audio, and video, especially when it’s paired with good metadata and transcripts.</p>

<h2 class="text-2xl font-bold mt-12 mb-4">Conclusion: LLMs pick smart, structured content</h2>
<p class="mb-6">If your web content is clear, supported with structured data, and optimized with consistent file formats like XML, large language models are far more likely to feature it. You don’t even have to rank #1 to show up in AI-generated answers. Structured data and clean LLM-content-format give language models a foundation for better understanding and quoting your material.</p>
<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-8">
  <p><strong>Related:</strong> <a href="/insights/why-llms-txt-matters-for-seo" class="text-primary hover:underline">Why LLMs.txt Matters for Modern SEO</a></p>
</blockquote>
`;

const defaultContent = `
<p class="mb-6 text-lg text-muted-foreground">This is a placeholder for the article content. The full content will be dynamically loaded based on the article's slug.</p>
<p class="mb-6">Please check back later or contact support if you believe this is an error.</p>
<h2 class="text-2xl font-bold mt-12 mb-4">Coming Soon</h2>
<p class="mb-6">More detailed content for this insight will be available shortly.</p>
`;


export function InsightPageContent({ slug }: { slug: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  let contentHtml = '';
  let articleData = insights.find(i => i.slug === slug);

  switch (slug) {
    case 'ai-investment-playbook':
      contentHtml = investmentArticleContent;
      break;
    case 'why-llms-txt-matters-for-seo':
      contentHtml = llmsTxtArticleContent;
      break;
    case 'seo-vs-geo-invisible-in-ai-search':
      contentHtml = seoVsGeoArticleContent;
      break;
    case '10-content-formats-that-get-picked-up-by-llms':
      contentHtml = tenFormatsArticleContent;
      break;
    default:
      contentHtml = defaultContent.replace('{{title}}', articleData?.title || 'this article');
  }

  useEffect(() => {
    const renderReactComponent = (containerId: string, Component: React.ElementType) => {
      const container = contentRef.current?.querySelector(`#${containerId}`);
      if (container && container.innerHTML === '') {
        const root = createRoot(container);
        root.render(<Component />);
      }
    };
    
    const renderImageComponent = (containerId: string, imageKey: keyof typeof imageData) => {
      const container = contentRef.current?.querySelector(`#${containerId}`);
       if (container && container.innerHTML === '') {
        const root = createRoot(container);
        const { src, alt, width, height, dataAiHint } = imageData[imageKey];
        root.render(
            <div data-ai-hint={dataAiHint}>
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="rounded-lg shadow-md"
                />
            </div>
        );
      }
    }
    
    const renderEnrollmentForm = (containerId: string) => {
        const container = contentRef.current?.querySelector(`#${containerId}`);
        if(container && container.innerHTML === '') {
            const root = createRoot(container);
            root.render(
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
            );
        }
    };

    if (contentRef.current) {
        if (slug === 'ai-investment-playbook') {
            renderReactComponent('portfolio-chart-container', InvestmentPortfolioChart);
            renderEnrollmentForm('download-guide');
        }
        if(slug === 'why-llms-txt-matters-for-seo') {
             renderImageComponent('llms-diagram-container', 'llmsDiagram');
             renderImageComponent('how-llms-work-container', 'howLlmsWork');
             renderImageComponent('tools-generating-docs-container', 'toolsGeneratingDocs');
             renderImageComponent('seo-checklist-container', 'seoChecklist');
        }
        if(slug === 'seo-vs-geo-invisible-in-ai-search') {
            renderImageComponent('chat-gpt-example', 'llmsDiagram');
            renderImageComponent('perplexity-example', 'howLlmsWork');
            renderImageComponent('gemini-example', 'toolsGeneratingDocs');
            renderImageComponent('seo-vs-geo-diagram', 'seoVsGeo');
        }
        if(slug === '10-content-formats-that-get-picked-up-by-llms') {
            renderImageComponent('data-analytics-dashboard-container', 'dataAnalyticsDashboard');
            renderImageComponent('workflow-diagram-container', 'workflowDiagram');
            renderImageComponent('financial-data-container', 'financialData');
        }
    }
  }, [slug]);

  return (
    <div
      ref={contentRef}
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
