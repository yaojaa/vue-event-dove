<template>
	<div class="ui fluid multiple search selection dropdown multiselects" id="dropdownId">
		<input name="gender" type="hidden" :value="values">
		<i class="dropdown icon"></i>
		<div class="default text">{{dataName.defaultName}}</div>
		<div class="menu">
			<div class="item" :data-value="item[dataName.valueName]" v-for="(item,index) in arrdata">{{item[dataName.textName]}}</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'dropdown',
		data() {
			return {
				values:''
			}
		},
		props: ['arrdata','dataName','defaultValue'],
		created() {
			this.values = this.defaultValue;
		},
		mounted() {

			$('#dropdownId')
			.dropdown({
				onChange: (value, text) => {
					this.$emit('change',value)
				}
			})
		},
		methods: {
			init(v){
				this.values = v;
				$('#dropdownId').dropdown('restore defaults')				
			}
		}
	}
</script>
