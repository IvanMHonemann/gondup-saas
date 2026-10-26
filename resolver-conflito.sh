#!/bin/bash

# Script para resolver conflito do .gitignore automaticamente

echo "🔧 Resolvendo conflito do .gitignore..."
echo ""

# Verificar se há conflitos
if git status | grep -q "both modified"; then
    echo "⚠️  Detectado conflito no .gitignore"
    echo ""
    
    # Aceitar a versão limpa (sem conflitos)
    echo "✅ Aceitando versão corrigida..."
    git checkout --theirs .gitignore 2>/dev/null || git checkout HEAD -- .gitignore
    
    # Adicionar ao staging
    echo "📦 Adicionando ao staging..."
    git add .gitignore
    
    # Verificar se há mais conflitos
    if git status | grep -q "both modified"; then
        echo ""
        echo "⚠️  Ainda há conflitos em outros arquivos:"
        git status | grep "both modified"
        echo ""
        echo "📝 Resolva manualmente ou execute:"
        echo "   git checkout --theirs nome-do-arquivo"
        echo "   git add nome-do-arquivo"
    else
        echo ""
        echo "✅ Conflito resolvido com sucesso!"
        echo ""
        echo "📝 Próximo passo:"
        echo "   git commit -m 'fix: resolver conflito no .gitignore'"
        echo "   git push origin main"
    fi
else
    echo "✅ Nenhum conflito detectado!"
    echo ""
    echo "📝 Você pode continuar com:"
    echo "   git add ."
    echo "   git commit -m 'fix: atualizar .gitignore'"
    echo "   git push origin main"
fi

echo ""
echo "📖 Para mais informações, veja: RESOLVER-CONFLITO.md"
