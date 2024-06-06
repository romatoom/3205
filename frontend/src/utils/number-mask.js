import IMask from 'imask'

function getMask(el) {
  return IMask(el, {
    mask: '00-00-00',
    lazy: false
  })
}

export { getMask }
