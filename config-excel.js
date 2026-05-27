/**
 * @fileoverview Motor de cálculo y configuración del presupuestador de marcos.
 * Centraliza las reglas de negocio y las tarifas base del taller.
 */

/**
 * Tarifas fijas por metro cuadrado e inmutables (congeladas para evitar modificaciones en runtime).
 * @readonly
 * @enum {number}
 */
const TARIFAS_COMPONENTES = Object.freeze({
    CRISTAL_NORMAL: 28.00,
    CRISTAL_MATE: 38.00,
    PASSPARTOUT: 22.00
});

/**
 * Configuración semántica del esquema de datos del formulario para renderizado dinámico.
 * @type {Array<{id: string, label: string}>}
 */
const CONFIG_CAMPOS = Object.freeze([
    { id: "referencia", label: "1. Referencia de Moldura" },
    { id: "ancho", label: "2. Ancho de moldura (cm)" },
    { id: "largo", label: "3. Largo de moldura (cm)" },
    { id: "grueso", label: "4. Grueso de moldura (cm)" },
    { id: "descuento", label: "5. Descuento (%)" }
]);

/**
 * Representa las dimensiones e inputs necesarios para el cálculo de un presupuesto.
 * @typedef {Object} DimensionesInput
 * @property {string} referencia - Código único de la moldura.
 * @property {number} ancho - Medida horizontal en centímetros.
 * @property {number} largo - Medida vertical en centímetros.
 * @property {number} grueso - Grosor del perfil de la moldura en centímetros.
 * @property {number} descuento - Porcentaje de descuento a aplicar (0 a 100).
 */

/**
 * Estructura de salida para cada opción de acabado calculada.
 * @typedef {Object} OpcionPresupuesto
 * @property {string} nombre - Descripción del acabado/componentes.
 * @property {number} inicial - Importe base calculado en euros sin descuento.
 * @property {number} final - Importe neto final tras aplicar el descuento.
 */

/**
 * Motor matemático que procesa las reglas de negocio de enmarcación y evalúa los acabados disponibles.
 * * @param {DimensionesInput} inputs - Estructura de datos sanitizada con las dimensiones.
 * @param {number} precioMetroMoldura - Tarifa base por metro lineal de la moldura seleccionada.
 * @returns {OpcionPresupuesto[]} Matriz de objetos con las 5 variantes de presupuestos calculadas.
 */
function calcularVariantes(inputs, precioMetroMoldura) {
    const { ancho, largo, grueso, descuento } = inputs;
    
    // 1. CÁLCULO DEL MARCO (Métrica lineal con compensación técnica de esquinas/ingletes)
    // Formula: (Perímetro + Holgura técnica de 8 ingletes de grosor) convertida a metros
    const metrosLineales = (((ancho * 2) + (largo * 2)) + (grueso * 8)) / 100;
    const precioBaseMarco = metrosLineales * precioMetroMoldura;

    // 2. CÁLCULO DE COMPONENTES DE SUPERFICIE (Métrica cuadrada)
    const superficieM2 = (ancho * largo) / 10000;
    
    const costeCristalNormal = superficieM2 * TARIFAS_COMPONENTES.CRISTAL_NORMAL;
    const costeCristalMate   = superficieM2 * TARIFAS_COMPONENTES.CRISTAL_MATE;
    const costePasspartout   = superficieM2 * TARIFAS_COMPONENTES.PASSPARTOUT;

    // 3. MATRIZ DE DEFINICIÓN DE ACABADOS DISPONIBLES
    const acabadosDisponibles = [
        { nombre: "Marco solo", inicial: precioBaseMarco },
        { nombre: "Marco + cristal normal", inicial: precioBaseMarco + costeCristalNormal },
        { nombre: "Marco + cristal mate", inicial: precioBaseMarco + costeCristalMate },
        { nombre: "Marco + pass + cristal normal", inicial: precioBaseMarco + costePasspartout + costeCristalNormal },
        { nombre: "Marco + pass + cristal mate", inicial: precioBaseMarco + costePasspartout + costeCristalMate }
    ];

    // 4. FACTORIZACIÓN Y RETORNO DE PRECIOS NETOS CON DESCUENTO APLICADO
    const factorDescuento = 1 - (descuento / 100);

    return acabadosDisponibles.map(opcion => ({
        nombre: opcion.nombre,
        inicial: opcion.inicial,
        final: opcion.inicial * factorDescuento
    }));
}