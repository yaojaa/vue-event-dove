<template>
	<div>
		<div class="ui mini modal" id="bindingLayer">
			 <i class="close icon"></i>
			<div class="header">
					绑定第三方账号
			</div>
			<div class="content">
				 <div class="ui padded grid">
					 <div class="two column row">
						 <div class="column">
							 <h4 class="ui header">
								<i class="circular wechat icon green large"></i>
								<div class="content">
									微信
									<div class="sub header"><small>已绑定</small></div>
								</div>
							</h4>
						 </div>
						 <div class="text-right column">
							 <button class="ui button blue basic fluid">绑定微信</button>
						 </div>
					 </div>
					 <div class="two column row">
							 <div class="column">
									 <h4 class="ui header">
											<i class="circular qq icon blue large"></i>
											<div class="content">
												QQ
												<div class="sub header"><small>已绑定</small></div>
											</div>
										</h4>
							 </div>
							 <div class="text-right column">
									 <button class="ui button blue basic fluid">绑定QQ</button>
							 </div>
					 </div>
					 <div class="two column row">
							 <div class="column">
									 <h4 class="ui header">
											<i class="circular weibo icon orange large"></i>
											<div class="content">
												新浪微博
												<div class="sub header"><small>已绑定</small></div>
											</div>
										</h4>
							 </div>
							 <div class="text-right column">
									 <button class="ui button blue basic fluid">绑定微博</button>
							 </div>
					 </div>
					 <div class="two column row">
						<div class="column">
							<h4 class="ui header">
								<i class="circular linkedin icon teal large"></i>
								<div class="content">
									Linkedin
									<div class="sub header"><small>已绑定</small></div>
								</div>
							</h4>
						</div>
						<div class="text-right column">
							<button class="ui button  basic fluid">绑定Linkedin</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {API_URL} from '../config'
	export default {
		verify:true,
		props: ['accountInfo'],
		data () {
			return {
				
			}
		},
		mounted () {
			// 取款密码
			$('#bindingLayer').modal({
				onHide: () => {
					this.$emit('updateLayerFlag', '');
				},
				onHidden: () => {
					$('#bindingLayer').remove();
				}
			}).modal('show');
		},
		methods: {
		}
	}
</script>