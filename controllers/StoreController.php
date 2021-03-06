<?php

namespace app\controllers;

use Yii;
use app\models\Store;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\web\UploadedFile;
use app\controllers\LogController;

/**
 * StoreController implements the CRUD actions for Store model.
 */
class StoreController extends Controller
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
     * Lists all Store models.
     * @return mixed
     */
    public function actionIndex()
    {
        $dataProvider = new ActiveDataProvider([
            'query' => Store::find(),
        ]);

        return $this->render('index', [
            'dataProvider' => $dataProvider,
        ]);
    }

    public function actionShow($id)
    {
        $this->layout = 'page';

        $dataProvider = new ActiveDataProvider([
            'query' => Store::find(),
        ]);

        if ($id == null){
          return $this->render('index', [
            'dataProvider' => $dataProvider,
        ]);
        } else {
            return $this->render('show', [
                'model' => $this->findModel($id),
            ]);
        }


    }

    /**
     * Displays a single Store model.
     * @param integer $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Store model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Store();

        if ($model->load(Yii::$app->request->post())) {

            $imageFile = UploadedFile::getInstance($model,'image');
            if (isset($imageFile->size)){
              $randNumber = rand(1,20000);
              $imageFile->saveAs('uploads/'.$imageFile->baseName.$randNumber.'.'.$imageFile->extension);
              $model->image = $imageFile->baseName.$randNumber.'.'.$imageFile->extension;
            } else {
              $model->image = 'logo-placeholder.jpg';
            }

            $model->save();


            LogController::createSystemLog(Yii::$app->user->getId(), "Store created.");
            return $this->redirect(['view', 'id' => $model->id]);
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Updates an existing Store model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post())) {

            $imageFile = UploadedFile::getInstance($model,'image');
            if (isset($imageFile->size)){
              $randNumber = rand(1,20000);
              $imageFile->saveAs('uploads/'.$imageFile->baseName.$randNumber.'.'.$imageFile->extension);
              $model->image = $imageFile->baseName.$randNumber.'.'.$imageFile->extension;
            } else {
              $model->image = 'logo-placeholder.jpg';
            }

            $model->save();

            LogController::createSystemLog(Yii::$app->user->getId(), "Store data altered.");
            return $this->redirect(['view', 'id' => $model->id]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing Store model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();
        LogController::createSystemLog(Yii::$app->user->getId(), "Store deleted.");
        return $this->redirect(['index']);
    }

    /**
     * Finds the Store model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Store the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Store::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
