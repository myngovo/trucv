import { meta } from '../meta'

export const data = [
  {
    title: 'About',
    data: [
      { type: 'gatsby', label: 'About myNGOVO', link: '../../pages/About.js' },
      { type: 'link', label: 'myNGOVO Advance', link: meta.myNGOVOAdvanceLink },
      { type: 'link', label: 'TruAttendance', link: meta.truAttendanceLink },
    ],
  },

  {
    title: 'Career Tools',
    data: [
      { type: 'link', label: 'Free Cv Builder', link: meta.cvBuilderLink },
      { type: 'link', label: 'CV Samples', link: meta.cvSampleLink },
      {
        type: 'link',
        label: 'Get CV Reviewed',
        link: meta.cvReviewLink,
      },
    ],
  },
  {
    title: 'Career Resources',
    data: [
      { type: 'link', label: 'Write & Earn', link: meta.earnLink },
      { type: 'link', label: 'Blog', link: meta.blogLink },
    ],
  },
]
