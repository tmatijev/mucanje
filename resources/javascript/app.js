(() => {
  'use strict'
  
  const defaults = {
    header: {
      mobileNavButton: '.js-mobile-menu-button',
      nav: '.js-primary-nav',
      navSubButton: '.js-link-sub'
    },
    viewports: {
      wide: 1200,
      desktop: 992,
      tablet: 768,
      mobile: 480
    }
  },
  
  mucanje = {
    opt: '',
    
    init: function(params){
        // this.opt = Object.assign({}, defaults, params)
        mucanje.helperDebounce()
        mucanje.helperToggleElement()
        mucanje.onResizeEvent()
        mucanje.currentResolution()
        mucanje.mobileMenu()
        mucanje.mobileDropdownMenu()
        mucanje.navHoverMenu()
    },

    helperDebounce: function debounce(func, wait, immediate) {
      let timeout
      return function () {
        let context = this
        let args = arguments
        let later = function () {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        
        let callNow = immediate && !timeout
        
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        
        if (callNow) {
          func.apply(context, args)
        }
      }
    },

    helperToggleElement: function (el) {
      if (!el) return false

      if (el.ownerDocument.defaultView.getComputedStyle(el, null).display === 'none') {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    },

    helperClosestElement: function closest(el, selector) {
      const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector

      while (el) {
        if (matchesSelector.call(el, selector)) {
          return el
        } else {
          el = el.parentElement
        }
      }
      return null
    },

    onResizeEvent: function () {
      let that = this
      
      let myEfficientFn = this.helperDebounce(function() {
        let res = that.currentResolution()

        if( res > defaults.viewports.tablet ) {
            that.resetMobileMenu()
        }else{
            that.resetMobileMenu()
            that.setMobileMenu()
            // that.mobileDropdownMenu()
        }
      }, 250)

      window.addEventListener('resize', myEfficientFn)
    },

    currentResolution: function () {
      return window.innerWidth || document.documentElement.clientWidth
    },

    mobileMenu: function () {
      let that = this
      let el = document.querySelectorAll(defaults.header.mobileNavButton)[0]

      el.addEventListener('click', function (e) {
        e.preventDefault()

        that.helperToggleElement(document.querySelectorAll(defaults.header.nav)[0])
        this.classList.toggle('mobile-menu__wrapper--active')
      })
    },

    setMobileMenu: function () {
      document.querySelectorAll(defaults.header.nav)[0].style.display = 'none'
    },

    resetMobileMenu: function () {
      document.querySelectorAll(defaults.header.mobileNavButton)[0].classList.remove('mobile-menu__wrapper--active')
      document.querySelectorAll(defaults.header.nav)[0].style.display = 'block'
    },

    navHoverMenu: function () {
      // if( this.currentResolution() < defaults.viewports.tablet ) {
      //   return false
      // }
      
      // var $navLink = {}
      // var navLinkIsActive = false
      
      // $( ".nav__list-item" ).hover(
      //   function() {
      //     $navLink = $(this).find('.nav__link')
      //     navLinkIsActive = $navLink.hasClass('nav__link--active') ? true : false
          
      //     if( navLinkIsActive ) {
      //       return false
      //     }
          
      //     $navLink.addClass('nav__link--active')
      //   }, function() {
      //     if( navLinkIsActive ) {
      //       return false
      //     }
          
      //     $navLink.removeClass('nav__link--active')
      //   }
      // )
    },

    mobileDropdownMenu: function () {
      let that = this
      let el = document.querySelectorAll(defaults.header.navSubButton)[0]

      // el.removeEventListener('click', false)
      el.addEventListener('click', function (e) {
        e.preventDefault()

        this.classList.toggle('nav__link--has-sub--active')
        let closest = that.helperClosestElement(this, defaults.header.nav)
        that.helperToggleElement(closest.querySelectorAll('.js-sub-nav')[0])
      })
    }
  }

  window.mucanje = mucanje
    
})()

if (document.readyState === 'complete' || document.readyState !== 'loading') {
  mucanje.init()
} else {
  document.addEventListener('DOMContentLoaded', mucanje.init)
}