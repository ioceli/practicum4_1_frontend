import { DocfinancierocabI } from "./docfinancierocab.interface";

export interface DocfinancieroDetalleI {
    id?: number,
    docfinancierocab: DocfinancierocabI,
    ctconceptocobrodet_id: string,
    valor: string,
    created_at: string,
    descripcion: string,
    estado: string,
    usucrud_id?: string
}