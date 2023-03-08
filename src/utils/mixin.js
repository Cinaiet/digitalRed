import {milliFormat} from '@/utils/function'

export default {
  mounted () {
  },
  data () {
    return {}
  },
  methods: {
    milliFormat (num) {
      return milliFormat(num)
    },
    keepPoint (num, point = 2, isRound = false) {
      if (!num) { return 0 }
      point = parseInt(`${point}`)
      if (isRound) {
        return parseFloat(num).toFixed(point || 2)
      }
      return parseFloat(num).toFixed(point + 1 || 3).slice(0, -1)
    }
  }
}
