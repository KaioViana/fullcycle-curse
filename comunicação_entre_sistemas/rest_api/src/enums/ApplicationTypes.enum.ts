enum ApplicationTypes {
  JSON = 'application/json',
  HAL_JSON = 'application/hal+json'
}

export enum ContentTypes {
  JSON = ApplicationTypes.JSON
}

export enum AcceptTypes {
  JSON = ApplicationTypes.JSON,
  HAL_JSON = ApplicationTypes.HAL_JSON
}
