# Conversor Universal de Medidas / Universal Unit Converter

[Português](#português) | [English](#english)

---

## Português

Um conversor de unidades executado no navegador com suporte a múltiplas unidades de medida. O projeto utiliza uma estética inspirada em pranchas de desenho técnico e ferramentas de engenharia clássicas.

### Funcionalidades

- **Conversão Bidirecional:** Dois campos editáveis que se atualizam instantaneamente.
- **Estética "Technical Drafting":** Interface com grade milimétrica, réguas funcionais e fontes monoespaçadas.
- **Escalas Secundárias:** Exibição automática de unidades menores e maiores para contexto rápido.
- **Filtragem Inteligente:** Pesquise unidades por nome ou símbolo diretamente nos dropdowns.
- **Internacionalização (i18n):** Suporte completo para Português (PT), Inglês (EN) e Francês (FR).
- **Design Responsivo:** Layout adaptável para desktop e dispositivos móveis.

### Stack

| Tecnologia | Descrição |
|---|---|
| **Vue 3** | Framework principal (Composition API) |
| **Vite** | Ferramenta de build e desenvolvimento |
| **CSS Vanilla** | Estilização pura sem frameworks |

### Lógica de Conversão

O motor utiliza o conceito de **Unidade Base**. Toda conversão segue o fluxo:
**Origem ➔ Base ➔ Destino**

#### Tabela de Unidades Base

| Categoria | Unidade Base | ID Interno |
|---|---|---|
| **Comprimento** | Metro | `m` |
| **Massa / Peso** | Quilograma | `kg` |
| **Temperatura** | Celsius | `C` |
| **Pressão** | Pascal | `Pa` |
| **Volume** | Litro | `L` |
| **Área** | Metro Quadrado | `m2` |
| **Velocidade** | Metro por segundo | `ms` |
| **Tempo** | Segundo | `s` |

---

## English

A browser-based unit converter with support for multiple units of measurement. The project features an aesthetic inspired by technical drawing boards and classic engineering tools.

### Features

- **Bidirectional Conversion:** Two editable fields that update instantly.
- **"Technical Drafting" Aesthetic:** Interface with a millimeter grid, functional rulers, and monospaced fonts.
- **Secondary Scales:** Automatic display of smaller and larger units for quick context.
- **Smart Filtering:** Search for units by name or symbol directly in the dropdowns.
- **Internationalization (i18n):** Full support for Portuguese (PT), English (EN), and French (FR).
- **Responsive Design:** Adaptive layout for desktop and mobile devices.

### Stack

| Technology | Description |
|---|---|
| **Vue 3** | Main framework (Composition API) |
| **Vite** | Build and development tool |
| **Vanilla CSS** | Pure styling without frameworks |

### Conversion Logic

The engine uses the **Base Unit** concept. Every conversion follows the flow:
**Source ➔ Base ➔ Destination**

#### Base Units Table

| Category | Base Unit | Internal ID |
|---|---|---|
| **Length** | Meter | `m` |
| **Mass / Weight** | Kilogram | `kg` |
| **Temperature** | Celsius | `C` |
| **Pressure** | Pascal | `Pa` |
| **Volume** | Liter | `L` |
| **Area** | Square Meter | `m2` |
| **Speed** | Meters per second | `ms` |
| **Time** | Second | `s` |
