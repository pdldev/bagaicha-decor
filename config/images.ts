export type ImageConfig = {
  src: string
  alt: string
  width: number
  height: number
  blurDataURL: string
}

export const defaultBlurDataURL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxwYXRoIGZpbGw9IiNlOGU0ZDUiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+'

export const createImageConfig = (
  src: string,
  alt: string,
  width = 1200,
  height = 900,
): ImageConfig => ({
  src,
  alt,
  width,
  height,
  blurDataURL: defaultBlurDataURL,
})
