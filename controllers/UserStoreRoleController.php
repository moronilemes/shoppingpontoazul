<?php

namespace app\controllers;

use Yii;
use app\models\UserStoreRole;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use app\controllers\LogController;
/**
 * UserStoreRoleController implements the CRUD actions for UserStoreRole model.
 */
class UserStoreRoleController extends Controller
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
     * Lists all UserStoreRole models.
     * @return mixed
     */
    public function actionIndex()
    {
        $dataProvider = new ActiveDataProvider([
            'query' => UserStoreRole::find(),
        ]);

        return $this->render('index', [
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single UserStoreRole model.
     * @param integer $user_id
     * @param integer $store_id
     * @param string $role
     * @return mixed
     */
    public function actionView($user_id, $store_id, $role)
    {
        return $this->render('view', [
            'model' => $this->findModel($user_id, $store_id, $role),
        ]);
    }

    /**
     * Creates a new UserStoreRole model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new UserStoreRole();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            LogController::createSystemLog(Yii::$app->user->getId(), "New user related to store.");
            return $this->redirect(['view', 'user_id' => $model->user_id, 'store_id' => $model->store_id, 'role' => $model->role]);
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Updates an existing UserStoreRole model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $user_id
     * @param integer $store_id
     * @param string $role
     * @return mixed
     */
    public function actionUpdate($user_id, $store_id, $role)
    {
        $model = $this->findModel($user_id, $store_id, $role);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            LogController::createSystemLog(Yii::$app->user->getId(), "User related to store updated.");
            return $this->redirect(['view', 'user_id' => $model->user_id, 'store_id' => $model->store_id, 'role' => $model->role]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing UserStoreRole model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $user_id
     * @param integer $store_id
     * @param string $role
     * @return mixed
     */
    public function actionDelete($user_id, $store_id, $role)
    {
        $this->findModel($user_id, $store_id, $role)->delete();
        LogController::createSystemLog(Yii::$app->user->getId(), "User related to store deleted.");
        return $this->redirect(['index']);
    }

    /**
     * Finds the UserStoreRole model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $user_id
     * @param integer $store_id
     * @param string $role
     * @return UserStoreRole the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($user_id, $store_id, $role)
    {
        if (($model = UserStoreRole::findOne(['user_id' => $user_id, 'store_id' => $store_id, 'role' => $role])) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
