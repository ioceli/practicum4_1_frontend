import { DocfinancierocabI } from "../financiero/docfinancierocab.interface";
import { DocumentoLegalizacionI } from "./documentolegalizacion.interface"

export interface SolicitudI {
    id?: number,
    numSolicitud?: string,
    identificacion: string,
    nombre: string,
    nombreTipologia: string,
    numDocumentos: number,
    correo: string,
    documentoLegalizacionesList: DocumentoLegalizacionI[],
    docfinancierocab?: DocfinancierocabI,
    numeroOP?: string,
    totaPagar?: string,
    fechaEmision?: string,
    estado?: string
}