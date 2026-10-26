# 🚀 Guia de Deploy - Promotores SaaS

## ⚠️ Problema: Arquivos não estão sendo aceitos

Se o repositório não está aceitando os arquivos, siga estas soluções:

---

## 🔧 Solução 1: Verificar .gitignore

O problema pode estar no `.gitignore`. Execute no terminal:

```bash
# Ver se os arquivos estão sendo ignorados
git check-ignore -v .npmrc .node-version vercel.json

# Se aparecer algo, edite o .gitignore e remova essas linhas
```

---

## 🔧 Solução 2: Forçar adição dos arquivos

```bash
# Forçar adição mesmo se estiverem no .gitignore
git add -f .npmrc
git add -f .node-version
git add -f vercel.json
git add -f package.json

# Verificar status
git status

# Commit
git commit -m "fix: configuração deploy Vercel"

# Push
git push origin main
```

---

## 🔧 Solução 3: Verificar permissões do repositório

```bash
# Ver remote configurado
git remote -v

# Se não tiver remote, adicionar
git remote add origin https://github.com/SEU_USUARIO/promotores-saas.git

# Verificar branch atual
git branch

# Se não estiver em main
git branch -M main

# Push forçado
git push -u origin main --force
```

---

## 🔧 Solução 4: Clonar e recriar

Se nada funcionar, clone o repositório novamente:

```bash
# Backup dos arquivos importantes
cp -r src /tmp/src-backup
cp package.json /tmp/
cp index.html /tmp/

# Clonar novamente
git clone https://github.com/SEU_USUARIO/promotores-saas.git
cd promotores-saas

# Copiar arquivos de volta
cp -r /tmp/src-backup/* src/
cp /tmp/package.json .
cp /tmp/index.html .

# Adicionar novos arquivos
# (copie .npmrc, .node-version, vercel.json manualmente)

# Commit e push
git add .
git commit -m "fix: recriar projeto com configurações corretas"
git push origin main
```

---

## 🔧 Solução 5: Verificar erros específicos

Execute estes comandos para ver o que está acontecendo:

```bash
# Ver logs do Git
git log --oneline -5

# Ver status detalhado
git status --short

# Ver se há conflitos
git diff

# Ver configuração do Git
git config --list
```

---

## 📋 Arquivos Necessários para Deploy

Certifique-se de que estes arquivos existem:

- ✅ `package.json` (com `"packageManager": "npm@10.0.0"`)
- ✅ `vercel.json` (configuração do Vercel)
- ✅ `.npmrc` (configuração npm)
- ✅ `.node-version` (Node.js 20)
- ✅ `src/` (código fonte)
- ✅ `index.html` (HTML base)

---

## 🆘 Se ainda não funcionar

Me envie o erro exato que aparece no terminal quando você tenta fazer o commit ou push. Exemplos:

- `error: failed to push some refs`
- `error: src refspec main does not match any`
- `error: RPC failed`
- `Everything up-to-date`
- Outro erro específico

Com o erro exato, posso te ajudar melhor! 🎯

---

## ✅ Checklist Final

Antes de fazer push, verifique:

- [ ] Todos os arquivos foram criados
- [ ] `git status` mostra os arquivos modificados
- [ ] `git add .` funcionou sem erros
- [ ] `git commit` foi executado com sucesso
- [ ] `git remote -v` mostra o repositório correto
- [ ] `git push origin main` foi executado

---

**Dica:** Se estiver usando GitHub Desktop ou VS Code, tente usar o terminal diretamente para ter mais controle sobre o processo.
