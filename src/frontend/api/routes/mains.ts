import express from 'express';

const router = express.Router();

router.get('', async function (_req, res) {
    return res.redirect('compteurs');
    // We could render the home here instead by using the following code:
    //return res.render('home');
});

router.get('/compteurs', async function (_req, res) {
    return res.render('compteurs');
});

export default router;
