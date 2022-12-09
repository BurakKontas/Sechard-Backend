
const connectionsClose = (connections) => {
    connections.users.close();
    connections.contacts.close();
}

export default connectionsClose;