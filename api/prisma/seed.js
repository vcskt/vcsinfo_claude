"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2 = __importStar(require("argon2"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed...');
    // Clean tables (be careful in production!)
    await prisma.ticketComment.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.project.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.user.deleteMany();
    // Create admin user
    const adminPassword = await argon2.hash('admin123');
    const admin = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@vcsinfo.com.br',
            passwordHash: adminPassword,
            role: 'ADMIN',
            emailVerified: true,
            locale: 'pt',
        },
    });
    console.log('✅ Admin user created:', admin.email);
    // Create client user
    const clientPassword = await argon2.hash('client123');
    const client = await prisma.user.create({
        data: {
            name: 'Cliente Test',
            email: 'cliente@example.com',
            passwordHash: clientPassword,
            role: 'CLIENT',
            emailVerified: true,
            locale: 'pt',
        },
    });
    console.log('✅ Client user created:', client.email);
    // Create sample projects
    const projects = await Promise.all([
        prisma.project.create({
            data: {
                title: 'Sistema de Gestão Integrado',
                slug: 'sistema-gestao-integrado',
                summary: 'Implementação completa de ERP Protheus com customizações em ADVPL',
                content: 'Projeto de implementação de um sistema ERP utilizando Protheus com customizações avançadas em ADVPL e integração com front-end em Angular.',
                clientName: 'Empresa Tech Ltda',
                status: 'DELIVERED',
                techStack: ['Protheus', 'ADVPL', 'TLPP', 'Angular', 'PO-UI'],
                featured: true,
                published: true,
            },
        }),
        prisma.project.create({
            data: {
                title: 'Portal de Vendas e-Commerce',
                slug: 'portal-vendas-ecommerce',
                summary: 'Desenvolvemos um portal de vendas integrado ao Protheus',
                content: 'Portal de e-commerce totalmente customizado integrado ao ERP Protheus com API REST em NestJS e frontend em Angular.',
                clientName: 'Loja Online Brasil',
                status: 'DELIVERED',
                techStack: ['Protheus', 'NestJS', 'Angular', 'PostgreSQL', 'Stripe'],
                featured: true,
                published: true,
            },
        }),
        prisma.project.create({
            data: {
                title: 'Dashboard de BI e Relatórios',
                slug: 'dashboard-bi-relatorios',
                summary: 'Dashboard avançado com análise de dados do Protheus',
                content: 'Sistema de dashboards e relatórios interativos que extraem dados do Protheus em tempo real com visualizações em charts e gráficos.',
                clientName: 'Consultoria ABC',
                status: 'IN_PROGRESS',
                techStack: ['Protheus', 'NestJS', 'Angular', 'Chart.js', 'PostgreSQL'],
                featured: false,
                published: true,
            },
        }),
    ]);
    console.log('✅ Projects created:', projects.length);
    // Create blog posts
    const posts = await Promise.all([
        prisma.blogPost.create({
            data: {
                title: 'Guia Completo: Customizações em ADVPL',
                slug: 'guia-customizacoes-advpl',
                excerpt: 'Saiba como criar customizações poderosas e eficientes em ADVPL para o Protheus, com boas práticas e exemplos práticos.',
                content: 'Este artigo apresenta as melhores práticas para desenvolvimento de customizações em ADVPL...',
                category: 'Técnico',
                tags: ['ADVPL', 'Protheus', 'Customização'],
                locale: 'pt',
                authorId: admin.id,
                published: true,
                publishedAt: new Date(),
            },
        }),
        prisma.blogPost.create({
            data: {
                title: 'Angular + PO-UI: Interface Moderna para Protheus',
                slug: 'angular-poui-interface-moderna',
                excerpt: 'Integre Angular e PO-UI com seu Protheus para criar interfaces modernas e responsivas.',
                content: 'Com PO-UI e Angular, é possível criar interfaces web modernas e integradas ao Protheus...',
                category: 'Frontend',
                tags: ['Angular', 'PO-UI', 'Frontend'],
                locale: 'pt',
                authorId: admin.id,
                published: true,
                publishedAt: new Date(),
            },
        }),
        prisma.blogPost.create({
            data: {
                title: 'Best Practices: ADVPL and Modern Frontend',
                slug: 'best-practices-advpl-frontend',
                excerpt: 'Learn how to combine ADVPL backend with modern Angular frontend for optimal results.',
                content: 'This article covers the best practices for integrating ADVPL with modern frontend technologies...',
                category: 'Technical',
                tags: ['ADVPL', 'Angular', 'Best Practices'],
                locale: 'en',
                authorId: admin.id,
                published: true,
                publishedAt: new Date(),
            },
        }),
    ]);
    console.log('✅ Blog posts created:', posts.length);
    // Create testimonials
    const testimonials = await Promise.all([
        prisma.testimonial.create({
            data: {
                author: 'João Silva',
                role: 'CTO',
                company: 'Tech Solutions',
                quote: 'A expertise da VCS Info em Protheus transformou completamente nossa infraestrutura. Recomendo fortemente!',
                published: true,
            },
        }),
        prisma.testimonial.create({
            data: {
                author: 'Maria Santos',
                role: 'Diretora de Operações',
                company: 'Comércio Brasil',
                quote: 'Projeto entregue no prazo, com qualidade excepcional. A equipe é muito profissional e dedicada.',
                published: true,
            },
        }),
    ]);
    console.log('✅ Testimonials created:', testimonials.length);
    // Create sample ticket
    await prisma.ticket.create({
        data: {
            userId: client.id,
            title: 'Dúvida sobre relatório mensal',
            status: 'OPEN',
            priority: 'MEDIUM',
            comments: {
                create: [
                    {
                        authorId: admin.id,
                        body: 'Olá! Vou verificar este relatório para você.',
                    },
                ],
            },
        },
    });
    console.log('✅ Sample ticket created');
    console.log('✨ Database seeding completed!');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
