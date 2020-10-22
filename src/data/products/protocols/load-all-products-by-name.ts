export interface ILoadProductsByNameAdapter{
  loadNames: () => Promise<string[] | []>
}
