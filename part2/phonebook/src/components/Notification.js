const Notification = ({ message, typeClass }) => {
    if (message === null) {
        return null
    }

    const classes = `notification ${typeClass}`;

    return (
        <div className={classes}>
            {message}
        </div >
    )
}

export default Notification