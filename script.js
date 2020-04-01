let vm = new Vue({
  el: "#app",
  data: {
    movies: [],
    cart: [],
    currentPoster: null,
    isCartOpen: false
  },
  created() {
    let apiUrl = "movies.json"
    axios.get(apiUrl).then(res => {
      this.movies = res.data
    })
  },
  methods: {
    bgCSS(link) {
      return {
        'background-image':'url(' + link + ')',
        'background-position':'center center',
        'background-size':'cover'
      }
    },
    wheel(evt) {
      TweenMax.to('.cards',0.8,{
        left: '+=' + evt.deltaY * 2 + 'px'
      })
    },
    addCart(movie,evt) {
      let target = evt.target
      this.currentPoster = movie
      this.$nextTick(() => {
        TweenMax.from(".buy",1,{
          left: $(evt.target).offset().left,
          top: $(evt.target).offset().top,
          opacity: 1,
          ease: Power1.easeOut
        })
        setTimeout(() => {
          this.cart.push(movie)
        },1000)
      })
    }
  },
  computed: {
    totalPrice() {
      return this.cart
        .map(movie => movie.price)
        .reduce((total,p) => total + p,0)
    }
  },
  watch: {
    cart() {
      TweenMax.from(".fa-shopping-cart",0.5,{
        scale: 1.5,
        ease: Bounce.easeOut
      })
    }
  }
})