export interface Character {
  name: string
  race: string
  class: string
  active_spec_name: string
  active_spec_role: string
  gender: string
  faction: string
  achievement_points: number
  honorable_kills: number
  thumbnail_url: string
  region: string
  realm: string
  last_crawled_at: string
  profile_url: string
  profile_banner: string
  gear: Gear
}

export interface Gear {
  updated_at: string
  item_level_equipped: number
  item_level_total: number
  artifact_traits: number
  items: Items
}

export interface Items {
  head: Head
  neck: Neck
  shoulder: Shoulder
  back: Back
  chest: Chest
  waist: Waist
  wrist: Wrist
  hands: Hands
  legs: Legs
  feet: Feet
  finger1: Finger1
  finger2: Finger2
  trinket1: Trinket1
  trinket2: Trinket2
  mainhand: Mainhand
  offhand: Offhand
}

export interface Back {
  item_id: number
  item_level: number
  enchant: number
  icon: string
  name: string
  item_quality: number
  is_legendary: boolean
  is_azerite_armor: boolean
  gems: number[]
  bonuses: number[]
}


export interface Chest {
  item_id: number
  item_level: number
  enchant: number
  icon: string
  name: string
  item_quality: number
  is_legendary: boolean
  is_azerite_armor: boolean
  tier: string
  gems: number[]
  bonuses: number[]
}

export interface Wrist {
  item_id: number
  item_level: number
  enchant: number
  icon: string
  name: string
  item_quality: number
  is_legendary: boolean
  is_azerite_armor: boolean
  gems: number[]
  bonuses: number[]
}

export interface Legs {
  item_id: number
  item_level: number
  enchant: number
  icon: string
  name: string
  item_quality: number
  is_legendary: boolean
  is_azerite_armor: boolean
  gems: number[]
  bonuses: number[]
}

export interface Feet {
  item_id: number
  item_level: number
  enchant: number
  icon: string
  name: string
  item_quality: number
  is_legendary: boolean
  is_azerite_armor: boolean
  gems: number[]
  bonuses: number[]
}

export interface Finger1 {
  item_id: number
  item_level: number
  enchant: number
  icon: string
  name: string
  item_quality: number
  is_legendary: boolean
  is_azerite_armor: boolean
  gems: number[]
  bonuses: number[]
}

export interface Finger2 {
  item_id: number
  item_level: number
  enchant: number
  icon: string
  name: string
  item_quality: number
  is_legendary: boolean
  is_azerite_armor: boolean

  gems: number[]
  bonuses: number[]
}

export interface Mainhand {
  item_id: number
  item_level: number
  enchant: number
  icon: string
  name: string
  item_quality: number
  is_legendary: boolean
  is_azerite_armor: boolean
  gems: number[]
  bonuses: number[]
}
