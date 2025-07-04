import { withMermaid } from 'vitepress-plugin-mermaid'
import { defineConfig } from 'vitepress'

export default withMermaid(
    defineConfig({
      title: 'Radius Booking Plugin',
      description: 'Complete developer documentation for WordPress booking and appointment management system',
      base: '/',
      cleanUrls: true,
      ignoreDeadLinks: true,

      head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { name: 'theme-color', content: '#646cff' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        ['meta', { property: 'og:title', content: 'Radius Booking Plugin | Developer Documentation' }],
        ['meta', { property: 'og:site_name', content: 'Radius Booking Docs' }],
        ['meta', { property: 'og:description', content: 'Complete developer guide for building booking and appointment management systems with WordPress, React, and modern web technologies.' }]
      ],

      themeConfig: {
        logo: '/logo.svg',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/overview' },
          { text: 'Architecture', link: '/architecture/system-overview' },
          { text: 'Development', link: '/development/setup' },
          { text: 'API Reference', link: '/api/endpoints' },
          { text: 'Examples', link: '/examples/adding-features' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Project Overview', link: '/guide/overview' },
                { text: 'Folder Structure', link: '/guide/folder-structure' },
                { text: 'Tech Stack', link: '/guide/tech-stack' },
                { text: 'Key Features', link: '/guide/features' }
              ]
            }
          ],
          '/architecture/': [
            {
              text: 'System Architecture',
              items: [
                { text: 'System Overview', link: '/architecture/system-overview' },
                { text: 'PHP Backend', link: '/architecture/php-backend' },
                { text: 'React Frontend', link: '/architecture/react-frontend' },
                { text: 'Database Design', link: '/architecture/database' },
                { text: 'API Flow', link: '/architecture/api-flow' },
                { text: 'Class Relationships', link: '/architecture/class-relationships' }
              ]
            }
          ],
          '/development/': [
            {
              text: 'Development Guide',
              items: [
                { text: 'Setup Guide', link: '/development/setup' },
                { text: 'File Organization', link: '/development/file-organization' },
                { text: 'Naming Conventions', link: '/development/naming-conventions' },
                { text: 'WP-CLI Commands', link: '/development/wp-cli-commands' },
                { text: 'Testing Strategy', link: '/development/testing' },
                { text: 'Best Practices', link: '/development/best-practices' },
                { text: 'Deployment', link: '/development/deployment' }
              ]
            }
          ],
          '/api/': [
            {
              text: 'API Reference',
              items: [
                { text: 'REST Endpoints', link: '/api/endpoints' },
                { text: 'Authentication', link: '/api/authentication' },
                { text: 'Request/Response', link: '/api/request-response' },
                { text: 'Error Handling', link: '/api/error-handling' },
                { text: 'Rate Limiting', link: '/api/rate-limiting' }
              ]
            }
          ],
          '/examples/': [
            {
              text: 'Examples & Tutorials',
              items: [
                { text: 'Adding New Features', link: '/examples/adding-features' },
                { text: 'Creating Components', link: '/examples/creating-components' },
                { text: 'Database Migrations', link: '/examples/database-migrations' },
                { text: 'Custom Workflows', link: '/examples/custom-workflows' }
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/radius-booking/plugin' }
        ],
        search: {
          provider: 'local'
        },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2024 Radius Booking Contributors'
        }
      },

      markdown: {
        theme: {
          light: 'github-light',
          dark: 'github-dark'
        },
        lineNumbers: true,
        config: (md) => {
          // Custom markdown configurations here
        }
      },

      vite: {
        define: {
          __VUE_OPTIONS_API__: false
        }
      },

      // 👇 Mermaid Plugin Configuration
      mermaid: {
        // Optional Mermaid global config (see Mermaid docs)
      },
      mermaidPlugin: {
        class: 'mermaid' // Optional extra classes
      }
    })
)