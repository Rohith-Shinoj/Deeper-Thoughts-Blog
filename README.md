## Deeper Thoughts - Blog

[Visit blog](https://www.deeper-thoughts-blog.rohithshinoj.com)

Source code for DeeperThoughts - a personal blog dedicated to explorations of advanced topics in machine learning, generative AI, systems design, and beyond. This platform is built on the belief that a surface-level understanding or reliance solely on high-level frameworks often obscures the underlying mechanics that drive innovation and performance. Each of these articles strive to demystify intricate systems, highlight their nuances, and encourage a deeper appreciation of their design and optimization potential.

### 🛠️ Tech Stack and Features

- Framework: Next.js
- Styling: TailwindCSS
- Hosting and Analytics: Vercel
- Article Editor: Markdown-JSX (.mdx)
- Authorization: Github authentication for comments/reactions (to avoid spam)
- Loader: Integrate a loader for improved user experience.
- Newsletter: Buttondown API for privacy-secure newsletter subscription and automated email notiftcation

This design was inspired by the blog template by timrix.

### 📁 Blog Article History

1. June 9th, 2025 | Beyond Attention—A Dive into the Interpretability of Self Attention Heads in modern LLMs [Link](https://www.deeper-thoughts-blog.rohithshinoj.com/blog/beyond-attention)

2. June 16th, 2025 | When GANs get Convincing (and when they Collapse): The Art of Faking It till you Make it [Link](https://www.deeper-thoughts-blog.rohithshinoj.com/blog/the-art-of-fake-it-till-you-make-it)

## 🔧 Setup

Follow these steps to get the blog running locally:

1. **Clone the repository**

   ```bash
   git clone [https://www.github.com/Rohith-Shinoj/blog1.git](https://www.github.com/rohith-shinoj/blog1.git)
   cd attention
   ```

2. **Install dependencies**  
   Make sure you have [Node.js](https://nodejs.org/) installed (preferably ≥ v18).  
   Then run:

   ```bash
   npm install
   npm run dev
   npm run build #for production
   ```

3. **Visit the blog**  
   Open [http://localhost:3000](http://localhost:3000) in your browser to see it live.

4. **Environment Variables (Optional)**

If using analytics, email services, or CMS integrations, copy `.env.example` to `.env.local` and add your keys:

```bash
cp .env.example .env.local
```

### 📝 Writing Posts

Have an idea in mind and wish to add your article? To add a new post:

1. Create a .mdx file under data/blogs/ with a filename like `my-first-post.mdx`.
2. Add frontmatter at the top of the file replacing as relevent:

```mdx
---
title: 'My First Post'
date: '2025-06-15'
lastmod: '2025-060-15'
author: 'Rohith Shinoj Kumar'
draft: false
summary: 'An intro to my thoughts on tech, AI, and creativity.'
tags: ['machine learning', 'AI', 'personal']
---

---
```

3. Write your content below the frontmatter using MDX syntax. You can embed React components, add code blocks, images, and more.
4. Submit a merge request at [Link](https://www.github.com/Rohith-Shinoj/blog1/pulls)

#### 🧠 Tips

- Store your images in `public/static/images/[blog-folder]` and reference them using relative paths.
- Use semantic headings (`##`, `###`, etc.) to structure your content.
- You can embed custom components like `<CodeBlock />`, `<Tweet />`, etc., as long as they're defined in your `components/`.

---

✅ Posts are automatically rendered and routed via the Next.js App Router using dynamic paths, so no further setup is required.

If you have general ideas for topics, want to know more or discuss, feel free to reach out!
