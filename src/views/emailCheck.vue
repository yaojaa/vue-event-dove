<template>
	<div>
		<div class="ui mini modal" id="emailcheck">
			<i class="close icon"></i>
			<div class="header">
				邮箱验证
			</div>
			<div class="content">
				<p class="text-info mb-md" v-if="accountInfo.email">当前已通过验证邮箱：{{accountInfo.email}}</p>
				<div class="ui horizontal divider" v-if="accountInfo.email">修改邮箱</div>
				<div class="ui form">
					<!-- <div class="field">
						<label for="">当前账号密码</label>
						<input type="password" placeholder="输入当前密码" v-model="emailLayer.password" v-vali="JSON.stringify({required:true,minLength:6,maxLength:32})" filed="emailLayer.password">
						<div v-if="$verify.$errors['emailLayer.password']" class="ui red basic pointing label">
							{{$verify.$errors['emailLayer.password']}}
						</div>
					</div> -->
					<div class="field">
							 <label for="">新的邮箱</label>
							 <input type="text" placeholder="输入新的邮箱号" v-model="emailLayer.email" v-vali="JSON.stringify({required:true,isEmail:true})" filed="emailLayer.email">
							 <div v-if="$verify.$errors['emailLayer.email']" class="ui red basic pointing label">
							{{$verify.$errors['emailLayer.email']}}
						</div>
					</div>
				</div>
			</div>
			<div class="actions text-center">
				<div class="ui button blue" @click="updateEmail">确定</div>
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
				emailLayer: {
	            	// password: '',
	            	email: ''
	            }
			}
		},
		mounted () {
			// 取款密码
			$('#emailcheck').modal({
				onHide: () => {
					this.$emit('updateLayerFlag', '');
				},
				onHidden: () => {
					$('#emailcheck').remove();
				}
			}).modal('show');
		},
		methods: {
			//修改邮箱
			async updateEmail () {
				try {
	                await this.$verify.check().then()
	            } catch (e) {
	                return false
	            }
				let _this = this;
				jQuery.ajax({
				    url: API_URL + "user/updateEmail",
				    type: "POST",
				    contentType: "application/json",
				    data: JSON.stringify({
				        // "password": _this.emailLayer.password,
				        "email": _this.emailLayer.email
				    })
				})
				.done(function(data, textStatus, jqXHR) {
					_this.accountInfo.email = data.email;
					$('#emailcheck').modal('hide');
				    _this.$message('修改邮箱成功');
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
				    _this.$message(JSON.parse(jqXHR.responseText).responseText);
				});
			}
		}
	}
</script>