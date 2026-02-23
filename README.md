# Mentoria em Grupo: Líder Multiplicador

Página de vendas premium para a **Mentoria em Grupo: Líder Multiplicador**, oferecida pela 2BX Assessoria.

## 📋 Descrição

Site institucional e página de vendas para a mentoria que transforma gestores inseguros em líderes comerciais de alta performance. Design minimalista com glassmorfismo futurista aplicado apenas quando essencial.

## 🎯 Estrutura do Projeto

```
mentoria-lider-multiplicador/
├── index.html              # Página principal completa
├── thankyou.html           # Página de obrigado pós-inscrição
├── privacidade.html        # Política de Privacidade
├── termos.html             # Termos de Uso
├── style.css               # Estilos premium minimalistas
├── script.js               # Funcionalidades interativas
├── animations.css          # Animações keyframes
├── package.json            # Dependências
├── README.md               # Documentação
└── public/                 # Recursos estáticos
    ├── Logo Líder Sem Medo Preto.png
    ├── brendha2.jpg
    ├── thiago.jpg
    └── Depoimentos/
        ├── IMG_3647.PNG
        ├── IMG_3648.PNG
        └── ...
```

## 🎨 Design

### Paleta de Cores

**Base:**
- Marrom primário: `#815433`
- Caramelo: `#bea587`
- Marrom claro: `#967a62`
- Marrom escuro: `#603c1c`

**Premium (Dourado/Ouro):**
- Dourado: `#D4AF37`
- Ouro claro: `#F4D03F`
- Ouro escuro: `#B8860B`

### Filosofia de Design

- **Minimalista:** Redução drástica de cards, bordas e containers visuais
- **Glassmorfismo:** Apenas quando essencial (card de pagamento)
- **Espaçamento negativo:** Uso de tipografia e espaçamento para organização
- **Elementos livres:** Sem excesso de containers visuais

## 🚀 Funcionalidades

### Principais

- ✅ Header tech sticky com badge e informações do evento
- ✅ Hero section minimalista com barra de progresso (7%)
- ✅ Seções informativas sem cards pesados
- ✅ Accordion para módulos da mentoria
- ✅ Carrossel vertical de 3 fileiras para depoimentos
- ✅ Card premium de pagamento com glassmorfismo
- ✅ Magnetic buttons nos CTAs principais
- ✅ Animações de scroll (Intersection Observer)
- ✅ Sistema de cookies e Consent Mode (LGPD)
- ✅ Responsivo (mobile-first)

### Interatividade

- Magnetic buttons nos CTAs principais
- Accordions expansíveis para módulos
- Carrossel vertical de depoimentos (3 fileiras deslizando)
- Animações suaves ao scroll
- Smooth scroll para links âncora
- Lazy loading de imagens

## 📱 Responsividade

- **Mobile-first approach**
- Breakpoints: 768px (tablet), 1024px (desktop)
- Touch gestures para mobile
- Ajustes de grid/flex por breakpoint
- Carrossel adaptativo (1 fileira no mobile, 3 no desktop)

## 🔧 Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript (ES6+)
- Google Analytics (Consent Mode)
- LGPD compliant

## 📦 Instalação

```bash
# Instalar dependências (se necessário)
npm install

# Rodar servidor local de desenvolvimento
npm run dev
# ou
npx serve .
```

## ⚙️ Configurações

### Variáveis JavaScript (script.js)

```javascript
const EVENT_DATE = '15 Jan 2026';
const EVENT_TIME = '20h';
const PROGRESS_PERCENTAGE = 7; // 7% de progresso
```

### Google Analytics

Para ativar o Google Analytics, descomente e configure no `index.html`:

```javascript
// Substituir G-XXXXXXXXXX pelo seu ID do Google Analytics
gtag('config', 'G-XXXXXXXXXX');
```

### WhatsApp Community

Atualize o link da comunidade no `thankyou.html`:

```html
<a href="https://chat.whatsapp.com/SUA_LINK_AQUI" ...>
```

### Link de Pagamento

Atualize o link de pagamento no `index.html`:

```html
<a href="https://pagamento.mentoria.com" ...>
```

## 📝 Seções da Página Principal

1. **Header Tech** - Badge + data/hora + logo
2. **Hero** - Título + CTA + Barra de progresso (7%)
3. **Para Quem É** - 4 pain points dos líderes
4. **Conquistas** - 6 itens principais
5. **Módulos** - 4 encontros em grupo (accordion)
6. **Benefícios** - O que você vai receber
7. **Encontros Individuais** - Destaque para mentoria 1:1
8. **Bônus Exclusivos** - 4 bônus
9. **Mentores** - Layout livre da Brendha e Thiago
10. **Provas Reais** - Carrossel vertical de 3 fileiras
11. **Pagamento** - ÚNICO card premium R$1.997
12. **Footer** - Informações legais

## 🔒 LGPD Compliance

- ✅ Banner de consentimento de cookies
- ✅ Consent Mode para Google Analytics
- ✅ Política de Privacidade atualizada
- ✅ Termos de Uso atualizados
- ✅ Direitos do usuário conforme LGPD

## 🎯 Performance

- Lazy loading de imagens
- Preload de recursos críticos
- Otimização de animações (will-change, transform)
- Redução de animações em mobile (prefers-reduced-motion)
- Imagens otimizadas

## 📧 Contato

- **E-mail:** contato@2BXassessoria.com.br
- **Empresa:** 2BX Assessoria
- **Serviço:** Mentoria em Grupo: Líder Multiplicador

## 📄 Licença

© 2026 Líder Sem Medo | 2BX Assessoria. Todos os direitos reservados.

## 🔄 Atualizações

- Janeiro 2026 - Versão inicial da página de mentoria

---

**Desenvolvido com ❤️ para transformar gestores em líderes de alta performance.**
