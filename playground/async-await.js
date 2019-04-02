const doWork = async () => {
    return 'Dylan'
}

doWork().then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})