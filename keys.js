console.log('Keys are loaded');

exports.ziggeo = {
    consumer_encryption: process.env.ZIGGEO_ENCRYPTION_KEY,
    consumer_private: process.env.ZIGGEO_PRIVATE_KEY,
    access_token_key: process.env.ZIGGEO_TOKEN,
};


