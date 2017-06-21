<?php

namespace app\controllers;

use Yii;
use app\models\Customer;
use app\models\Chat;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * CustomerController implements the CRUD actions for Customer model.
 */
class CustomerController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all Customer models.
     * @return mixed
     */
    public function actionIndex()
    {
        $dataProvider = new ActiveDataProvider([
            'query' => Customer::find(),
        ]);

        return $this->render('index', [
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Customer model.
     * @param integer $id
     * @param integer $store
     * @return mixed
     */
    public function actionView($id, $store)
    {
        return $this->render('view', [
            'model' => $this->findModel($id, $store),
        ]);
    }

    /**
     * Creates a new Customer model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Customer();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id, 'store' => $model->store]);
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
    }

    public function actionInsert()
    {
      $chatSent = Yii::$app->request->post();

      if (($model = Customer::findOne(['email' => $chatSent['email'], 'store' => $chatSent['store']])) === null) {
        $model = new Customer();
        //$model->load(Yii::$app->request->post());

        //$model->id = '';
        $model->store = intval($chatSent['store']);
        $model->name = $chatSent['name'];
        $model->email = $chatSent['email'];
        $model->phone = $chatSent['phone'];

        $model->save();
      }

      $thisUser = Customer::findOne(['email' => $chatSent['email'], 'store' => $chatSent['store']]);
      //return ($thisUser->id);

      $chatMessage = new Chat();
      $chatMessage->customer = $thisUser->id;
      $chatMessage->message = $chatSent['message'];
      $chatMessage->store = $chatSent['store'];

      if(!$chatMessage->save()){
        return print_r($chatMessage);
      }
    }

    /**
     * Updates an existing Customer model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @param integer $store
     * @return mixed
     */
    public function actionUpdate($id, $store)
    {
        $model = $this->findModel($id, $store);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id, 'store' => $model->store]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing Customer model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @param integer $store
     * @return mixed
     */
    public function actionDelete($id, $store)
    {
        $this->findModel($id, $store)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Customer model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @param integer $store
     * @return Customer the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id, $store)
    {
        if (($model = Customer::findOne(['id' => $id, 'store' => $store])) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
