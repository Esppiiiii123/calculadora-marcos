# 🖼️ Presupuestador de Marcos Profesional — v1.0.0

## 📝 Contexto del Proyecto
Aplicación web autónoma de alto rendimiento desarrollada a medida para digitalizar, optimizar y automatizar el flujo de trabajo financiero de una tienda tradicional de enmarcación clásica. 

El software sustituye la dependencia de hojas de cálculo complejas, centralizando un catálogo histórico de **1.897 referencias de molduras** y calculando presupuestos en tiempo real bajo arquitecturas puras de frontend.

---

## 🚀 Características Clave & Reglas de Negocio
* **Motor Matemático de Enmarcación:** Cálculo automatizado de perímetros con compensación técnica de mermas e ingletes basados en el grosor del perfil de la moldura ($Perímetro + Holgura$).
* **Presupuestación Múltiple Simultánea:** Evaluación instantánea de 5 variantes de acabado comercial (Marco solo, Cristal Normal, Cristal Mate, Passpartout, etc.) en un solo clic.
* **Módulo de Divisa Tradicional:** Implementación de doble conversión monetaria síncrona (**Euros / Pesetas**) para salvaguardar la velocidad operativa del operario senior.
* **Diseño UI "Dark Mode" de Alta Fatiga:** Interfaz optimizada con Tailwind CSS en tonos oscuros para mitigar la fatiga visual durante jornadas comerciales intensas.

---

## 🛠️ Stack Tecnológico
* **Frontend:** HTML5, JavaScript Moderno (ES6+)
* **Estilos:** Tailwind CSS (via CDN para aislamiento de entorno)
* **Persistencia de Datos Local:** Data-driven architecture mediante módulos JS (`Object.freeze()`)

---

## 🧠 Retos Técnicos Solucionados (Clean Code & Arquitectura)

### 1. Inmutabilidad y Seguridad en Runtime
Se ha implementado `Object.freeze()` en el núcleo de la configuración de tarifas y componentes. Esto asegura que los precios base del negocio no puedan ser mutados ni corrompidos por scripts de terceros o inyecciones en caliente durante el tiempo de ejecución.

### 2. Algoritmo de Búsqueda Flexible e Indexación Masiva
Para evitar bloqueos de CORS al ejecutar la app de forma estrictamente local (`file://`), se prescindió de bases de datos tradicionales, estructurando los 1.897 registros en un módulo nativo de JS. El buscador implementa un sistema defensivo con `Object.keys()` y `.includes()` que sanitiza los strings eliminando espacios invisibles (`.trim()`) y saltos de línea heredados de exportaciones CSV defectuosas.

### 3. Separación Extrema de Conceptos (SoC)
La arquitectura divide estrictamente los Datos (`catalogo_molduras.js`), las Reglas de Negocio/Constantes (`config-excel.js`) y la capa de Presentación/Renderizado (`index.html`), permitiendo que el catálogo de precios se actualice por completo en el futuro sin necesidad de alterar una sola línea de la lógica matemática.

---

## 💻 Instalación y Despliegue Local

Al ser una aplicación 100% *Client-Side Architecture*, no requiere de servidores, Node.js ni bases de datos externas:

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/TuUsuario/calculadora-marcos.git](https://github.com/TuUsuario/calculadora-marcos.git)