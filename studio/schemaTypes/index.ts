import { authorType } from './authorType'
import { categoryType } from './categoryType'
import { externalImageType } from './externalImageType'
import { pageType } from './pageType'
import { postType } from './postType'
import { tagType } from './tagType'
import { portableTextType } from './portableTextType'
import iframeType from './iframeType'
import customFontsType from './customFontsType'
import blockContentType from './blockContentType'
import commentType from './commentType'

export const schemaTypes = [
  authorType,
  categoryType,
  pageType,
  postType,
  tagType,
  externalImageType,
  portableTextType,
  iframeType,
  commentType
];