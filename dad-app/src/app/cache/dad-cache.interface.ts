export interface IDadCache<T>{
    CreatedUnix: number
    ExpiresUnix: number
    Data: T
}