<script>
	export default {
    globalData: {
      innerAudioContex: uni.createInnerAudioContext()
    },
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  .page {
    width: 100%;
    height: 100%;
  }
</style>
