import type { IconType } from 'react-icons'
import { FiGlobe, FiLink, FiCode } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'
import {
  SiGithub,
  SiLinkedin,
  SiTwitter,
  SiFacebook,
  SiInstagram,
  SiYoutube,
} from 'react-icons/si'

export type LinkType =
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'email'
  | 'portfolio'
  | 'web'
  | 'other'

export function detectLinkType(url: string): LinkType {
  const urlLower = url.toLowerCase()

  if (urlLower.includes('github.com')) return 'github'
  if (urlLower.includes('linkedin.com')) return 'linkedin'
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com'))
    return 'twitter'
  if (urlLower.includes('facebook.com')) return 'facebook'
  if (urlLower.includes('instagram.com')) return 'instagram'
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be'))
    return 'youtube'
  if (urlLower.startsWith('mailto:')) return 'email'
  if (urlLower.includes('portfolio') || urlLower.includes('projects'))
    return 'portfolio'
  if (
    urlLower.startsWith('http://') ||
    urlLower.startsWith('https://') ||
    urlLower.includes('.')
  )
    return 'web'

  return 'other'
}

export function getLinkIcon(linkType: LinkType): IconType {
  const iconMap: Record<LinkType, IconType> = {
    github: SiGithub,
    linkedin: SiLinkedin,
    twitter: SiTwitter,
    facebook: SiFacebook,
    instagram: SiInstagram,
    youtube: SiYoutube,
    email: AiOutlineMail,
    portfolio: FiCode,
    web: FiGlobe,
    other: FiLink,
  }

  return iconMap[linkType]
}

export function getLinkColor(linkType: LinkType): string {
  const colorMap: Record<LinkType, string> = {
    github: 'text-gray-900 dark:text-white',
    linkedin: 'text-blue-700',
    twitter: 'text-blue-400',
    facebook: 'text-blue-600',
    instagram: 'text-pink-600',
    youtube: 'text-red-600',
    email: 'text-orange-600',
    portfolio: 'text-purple-600',
    web: 'text-teal-600',
    other: 'text-gray-600',
  }

  return colorMap[linkType]
}
