import Header from '../../Components/Header/Header'
import { TeamMemberList } from '../../Components/Team-member/Team-member-list'

export const TeamMembersPage = () => {
  return (
    <div className={'team-members-page'}>
      <Header title={'Участники команды'} />
      <div className='team-members-page__list'>
        <TeamMemberList />
      </div>
    </div>
  )
}
