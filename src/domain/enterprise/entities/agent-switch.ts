import { Entity } from '@/core/entities/entity'
import { UniqueID } from '@/core/entities/unique-id'

type AgentSwitchProps = {
	chatId: UniqueID
	agentId: UniqueID
	startDate: Date
	endDate: Date
}

export class AgentSwitch extends Entity<AgentSwitchProps> {
	get chatId() {
		return this.props.chatId
	}

	get agentId() {
		return this.props.agentId
	}

	get startDate(): Date {
		return this.props.startDate
	}

	get endDate(): Date {
		return this.props.endDate
	}

	static create(props: AgentSwitchProps, id?: UniqueID) {
		return new AgentSwitch({ ...props }, id)
	}
}
