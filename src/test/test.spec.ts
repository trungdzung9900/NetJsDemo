import { globalAgent } from "http";

class FriendList {
    friend = [];
    addFriend(name) {
        this.friend.push(name);
        this.announceFriendShip(name)
    }
    announceFriendShip(name) {
        global.console.log(`${name}is now a friend`);
    }
    removeFriend(name) {
        const idx = this.friend.indexOf(name);

        if (idx === -1) {
            throw new Error('Friend not found');
        }

        this.friend.splice(idx, 1);
    }
}


describe('FriendList', () => {
    let friendList;
    beforeEach(() => {
        friendList = new FriendList();
    })

    it('intialize friend list', () => {
        expect(friendList.friend.length).toEqual(0)
    });
    it('adds a friend to the list', () => {
        friendList.addFriend('Aka')
        expect(friendList.friend.length).toEqual(1)
    })
    it('announces friendship', () => {
        // mock function
        friendList.announceFriendShip = jest.fn();
        expect(friendList.announceFriendShip).toHaveBeenCalledTimes(0)
        friendList.addFriend('Arianl');
        expect(friendList.announceFriendShip).toHaveBeenCalledTimes(1)
    });

    describe('removeFriend', () => {
        it('remove friend', () => {
            friendList.addFriend('Momo')
            expect(friendList.friend[0]).toEqual('Momo')
            friendList.removeFriend('Momo');
            expect(friendList.friend[0]).toBeUndefined();
        })
        it('throws an error as friend does not exits',()=>{
            expect (()=>friendList.removeFriend('Momo')).toThrow(new Error('Friend not found'));
        })
    })
}); 