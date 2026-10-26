# ⚡ Promotores SaaS

> Plataforma de gestão inteligente de promotores de vendas e merchandising.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite)

---

## 🎯 Visão Geral

O **Promotores SaaS** é uma plataforma completa para gerenciamento de equipes de promotores de vendas, oferecendo controle de rotas, acompanhamento de visitas em tempo real, relatórios de performance e muito mais.

## ✨ Funcionalidades

### 📊 Dashboard
- Métricas em tempo real (promotores ativos, visitas, conclusões)
- Gráficos de performance semanal e mensal
- Atividades recentes com status visual
- Ranking dos top promotores

### 👥 Gestão de Promotores
- Cadastro completo com validação
- Busca por nome, região ou e-mail
- Filtros por status (ativo, inativo, férias)
- Edição e exclusão com confirmação
- Notificações toast de feedback

### 📍 Controle de Visitas
- Lista de visitas com status (pendente, em andamento, concluída, atrasada, cancelada)
- Filtros por status e promotor
- Detalhes expandíveis com observações
- Tipos de visita categorizados (Reposição, Merchandising, Auditoria, Pesquisa)

### 📈 Relatórios
- Performance por região
- Distribuição por tipo de visita
- Tendência diária
- Metas mensais com % atingido
- Exportação de dados

### ⚙️ Configurações
- Perfil do usuário
- Notificações personalizáveis
- Segurança (2FA, sessões ativas)
- Aparência (tema, idioma, densidade)
- Informações do sistema e integrações

## 🚀 Tecnologias

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| React | 18.2 | UI Framework |
| TypeScript | 5.7 | Type Safety |
| Vite | 6.3 | Build Tool |
| Tailwind CSS | 4.1 | Styling |
| Recharts | 2.10 | Gráficos |
| Lucide React | 0.294 | Ícones |

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/promotores-saas.git
cd promotores-saas

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🏗️ Estrutura do Projeto

```
promotores-saas/
├── src/
│   ├── components/
│   │   └── Sidebar.tsx          # Navegação lateral responsiva
│   ├── pages/
│   │   ├── Dashboard.tsx        # Painel principal com métricas
│   │   ├── Promotores.tsx       # CRUD de promotores
│   │   ├── Visitas.tsx          # Controle de visitas
│   │   ├── Relatorios.tsx       # Gráficos e análises
│   │   ├── Configuracoes.tsx    # Preferências do sistema
│   │   └── LoginPage.tsx        # Autenticação
│   ├── App.tsx                  # Componente raiz
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globais + animações
├── index.html                   # HTML base
├── package.json                 # Dependências
├── vite.config.js               # Configuração Vite
└── tsconfig.json                # Configuração TypeScript
```

## 🎨 Design

- **Interface moderna** com glassmorphism na tela de login
- **Sidebar colapsável** com transições suaves
- **Responsivo** — funciona em desktop, tablet e mobile
- **Animações CSS** nativas (fadeIn, slideUp, scaleIn)
- **Paleta de cores** personalizada com tema azul profissional

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build otimizado para produção |
| `npm run typecheck` | Verifica tipos TypeScript |

## 📝 Changelog

### v2.4.1 (Atual)
- ✅ Correção de 15 problemas identificados em auditoria
- ✅ CRUD completo de promotores funcional
- ✅ Sidebar responsiva com menu mobile
- ✅ Sistema de notificações toast
- ✅ Modal de confirmação para exclusões
- ✅ Otimização: HTML reduzido 71%
- ✅ Otimização: JS bundle reduzido 14%
- ✅ Correção: gradient SVG renderizando corretamente
- ✅ Correção: dropdown fecha ao clicar fora

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">
  <strong>Feito com ❤️ para equipes de promotores</strong>
</div>
