export class Movie {
    constructor (public id: number, public  categoryId: number, public  title: string, public  description: string,
    public director: string, public releaseYear: number, public genre : string) {}
}