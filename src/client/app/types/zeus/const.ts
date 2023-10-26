/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	DateTime: `scalar.DateTime` as const,
	Mutation:{
		createOrder:{

		}
	}
}

export const ReturnTypes: Record<string,any> = {
	User:{
		id:"Float",
		provider:"String",
		providerId:"String",
		username:"String",
		name:"String",
		orders:"Order",
		created_at:"DateTime",
		updated_at:"DateTime"
	},
	DateTime: `scalar.DateTime` as const,
	Order:{
		id:"Float",
		alias:"String",
		user:"User",
		thing:"Thing",
		created_at:"DateTime",
		updated_at:"DateTime"
	},
	Thing:{
		id:"Float",
		name:"String",
		orders:"Order",
		created_at:"DateTime",
		updated_at:"DateTime"
	},
	Query:{
		users:"User",
		whoAmI:"User",
		things:"Thing",
		orders:"Order"
	},
	Mutation:{
		createOrder:"Order"
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}