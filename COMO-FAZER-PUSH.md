# 📋 Passo a Passo - Deploy no Vercel

## 🎯 Problema: "repositório não está aceitando os arquivos"

---

## ✅ PASSO 1: Verificar o que está acontecendo

Abra o **terminal** e execute:

```bash
git status
```

**O que você deve ver:**
- Arquivos em vermelho (não adicionados)
- Arquivos em verde (prontos para commit)

---

## ✅ PASSO 2: Adicionar TODOS os arquivos

```bash
git add .
```

**Se der erro**, tente:
```bash
git add -A
```

---

## ✅ PASSO 3: Verificar se foi adicionado

```bash
git status
```

Agora os arquivos devem estar em **verde**.

---

## ✅ PASSO 4: Fazer o commit

```bash
git commit -m "fix: corrigir deploy Vercel"
```

---

## ✅ PASSO 5: Fazer o push

```bash
git push origin main
```

**Se der erro "remote not found":**
```bash
git remote add origin https://github.com/SEU_USUARIO/promotores-saas.git
git push -u origin main
```

---

## 🆘 ERROS COMUNS E SOLUÇÕES

### ❌ Erro: "nothing to commit"
**Solução:** Os arquivos já foram commitados. Pule para o passo 5.

### ❌ Erro: "remote origin already exists"
**Solução:** O remote já está configurado. Pule para o passo 5.

### ❌ Erro: "failed to push some refs"
**Solução:**
```bash
git pull origin main --rebase
git push origin main
```

### ❌ Erro: "Authentication failed"
**Solução:** Você precisa configurar o GitHub:
```bash
git config --global user.email "seu@email.com"
git config --global user.name "Seu Nome"
```

### ❌ Erro: "Permission denied (publickey)"
**Solução:** Use HTTPS ao invés de SSH:
```bash
git remote set-url origin https://github.com/SEU_USUARIO/promotores-saas.git
```

---

## 📂 Arquivos que DEVEM estar no repositório

Após o `git add .`, você deve ter:

```
✅ .gitignore
✅ .node-version
✅ README.md
✅ DEPLOY-GUIDE.md
✅ index.html
✅ package.json
✅ package-lock.json
✅ tsconfig.json
✅ vercel.json
✅ vite.config.js
✅ src/App.tsx
✅ src/main.tsx
✅ src/index.css
✅ src/components/Sidebar.tsx
✅ src/pages/Dashboard.tsx
✅ src/pages/Promotores.tsx
✅ src/pages/Visitas.tsx
✅ src/pages/Relatorios.tsx
✅ src/pages/Configuracoes.tsx
✅ src/pages/LoginPage.tsx
```

---

## 🚀 Após o Push

1. Acesse: https://vercel.com/dashboard
2. Seu projeto deve aparecer
3. O deploy vai iniciar automaticamente
4. Aguarde ~2 minutos
5. Acesse a URL gerada

---

## 💡 Dica Importante

Se você está usando **VS Code**:
1. Abra o terminal integrado (`Ctrl + '` ou `Cmd + '`)
2. Execute os comandos acima
3. Observe as mensagens de erro

Se você está usando **GitHub Desktop**:
1. Vá em "Repository" → "Push"
2. Ou clique no botão "Push origin"

---

## 📞 Precisa de Ajuda?

Me envie:
1. O comando que você executou
2. A mensagem de erro exata
3. O resultado do `git status`

Com essas informações, posso te ajudar a resolver! 🎯
