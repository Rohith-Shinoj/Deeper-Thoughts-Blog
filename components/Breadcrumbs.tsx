// import Link from '@/components/Link'

// interface BreadcrumbItem {
//   name: string
//   href?: string
// }

// interface BreadcrumbsProps {
//   items: BreadcrumbItem[]
// }

// export default function Breadcrumbs({ items }: BreadcrumbsProps) {
//   if (!items || items.length < 2) return null

//   // Structured data for SEO
//   const jsonLd = {
//     '@context': 'https://schema.org',
//     '@type': 'BreadcrumbList',
//     itemListElement: items.map((item, idx) => ({
//       '@type': 'ListItem',
//       position: idx + 1,
//       name: item.name,
//       item: item.href || '',
//     })),
//   }

//   return (
//     <nav aria-label="Breadcrumb" className="mb-4">
//       <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//         {items.map((item, idx) => (
//           <li key={idx} className="flex items-center">
//             {idx > 0 && <span className="mx-2">/</span>}
//             {item.href && idx !== items.length - 1 ? (
//               <Link href={item.href} className="hover:text-primary-500 dark:hover:text-primary-400">
//                 {item.name}
//               </Link>
//             ) : (
//               <span className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</span>
//             )}
//           </li>
//         ))}
//       </ol>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//     </nav>
//   )
// }

import Link from '@/components/Link'

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length < 2) return null

  const baseUrl = 'https://www.deeper-thoughts-blog.rohithshinoj.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.href
        ? item.href.startsWith('http')
          ? item.href
          : `${baseUrl}${item.href}`
        : `${baseUrl}/`,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {idx > 0 && <span className="mx-2">/</span>}
            {item.href && idx !== items.length - 1 ? (
              <Link href={item.href} className="hover:text-primary-500 dark:hover:text-primary-400">
                {item.name}
              </Link>
            ) : (
              <span className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  )
}
