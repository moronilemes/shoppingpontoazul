<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Cookie;
use yii\web\CHttpCookie;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\SignupForm;
use app\models\Category;
use app\models\UserStoreRole;
use app\controllers\LogController;

$session = Yii::$app->session;
$session->open();

class SiteController extends Controller
{
    /**
     * @inheritdoc
     */

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        $query = Category::find();
        $categories = $query->all();

        $this->layout = 'home';
        return $this->render('index',[
            'categories' => $categories,
        ]);
    }

    /**
     * Login action.
     *
     * @return string
     */
    public function actionLogin()
    {
//        if (!Yii::$app->user->isGuest) {
//            return $this->goHome();
//        }

        $this->layout = 'home';
        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {

            $storeQuery = UserStoreRole::find()->where('user_id='.$model->user["id"])->all();
            Yii::$app->session->open();

            Yii::$app->session['store'] = $storeQuery[0]['store_id'];
            Yii::$app->session['user'] = $storeQuery[0]['user_id'];
            Yii::$app->session['role'] = $storeQuery[0]['role'];

            LogController::createSystemLog($storeQuery[0]['user_id'], "User logged in.");

            if (Yii::$app->session['role']=='admin'){
                return $this->redirect("/store/");
            } else {
                return $this->redirect("/chat/panel/");
            }
            //return $this->goBack();
        }
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    /**
     * Logout action.
     *
     * @return string
     */
    public function actionLogout()
    {
        LogController::createSystemLog(Yii::$app->user->getId(), "User logged out.");
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return string
     */
    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
            'model' => $model,
        ]);
    }

    /**
     * Displays about page.
     *
     * @return string
     */
    public function actionAbout()
    {
        return $this->render('about');
    }

    public function actionSignup()
    {
        $model = new SignupForm();
        if ($model->load(Yii::$app->request->post())) {
            if ($user = $model->signup()) {
                if (Yii::$app->getUser()->login($user)) {
                    return $this->goBack();
                }
            }
        }

        return $this->render('signup', [
            'model' => $model,
        ]);
    }

    public function getCategory(){
        $query = Category::find();
        $categories = $query->all();
        return $categories;
    }

    public function actionLanguage() {

    if (Yii::$app->request->get('lg')) {
      echo Yii::$app->language;

        \Yii::$app->language = Yii::$app->request->get('lg');
        \Yii::$app->session->set('lang', Yii::$app->request->get('lg'));
        //$cookie = new yii\web\Cookie();
        Yii::$app->request->cookies['_lang'] = new CHttpCookie('_lang', 'en');


    } else {
        //or you may want to set lang session, this is just a sample
        \Yii::$app->language = 'pt_BR';
        \Yii::$app->session->set('lang', 'pt_BR'); //or $_GET['lang']
    }
    //return parent::beforeAction($action);

    $this->redirect('/site/index');
}


}
