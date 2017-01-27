<?php

namespace app\controllers;

use Yii;
use app\models\Product;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * ProductController implements the CRUD actions for Product model.
 */
class ProductController extends Controller
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
     * Lists all Product models.
     * @return mixed
     */
    public function actionIndex()
    {
        $dataProvider = new ActiveDataProvider([
            'query' => Product::find(),
        ]);

        return $this->render('index', [
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Product model.
     * @param integer $id
     * @param integer $anymarket_id
     * @return mixed
     */
    public function actionView($id, $anymarket_id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id, $anymarket_id),
        ]);
    }

    /**
     * Creates a new Product model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        
        $model = new Product();
        
        if(Yii::$app->request->isAjax){
            if (Yii::$app->request->post()) {
                $model->id = Yii::$app->request->post('id');
                $model->anymarket_id = Yii::$app->request->post('anymarket_id');
                $model->user_id = Yii::$app->request->post('user_id');

                $model->save();
                return 'Saved in DB';
                
            } else {
                return 'Could not save in database!';
            }

//            $response = Yii::$app->response;
//            $response->format = \yii\web\Response::FORMAT_JSON;
//            $response->data = ['filename' => $filename];
//            $response->statusCode = 200;
//            return $response;
            
        } else {
            if ($model->load(Yii::$app->request->post()) && $model->save()) {
                return $this->redirect(['view', 'id' => $model->id, 'anymarket_id' => $model->anymarket_id]);
            } else {
                return $this->render('create', [
                    'model' => $model,
                ]);
            }
        }
    }

    /**
     * Updates an existing Product model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @param integer $anymarket_id
     * @return mixed
     */
    public function actionUpdate($id, $anymarket_id)
    {
        $model = $this->findModel($id, $anymarket_id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id, 'anymarket_id' => $model->anymarket_id]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing Product model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @param integer $anymarket_id
     * @return mixed
     */
    public function actionDelete($id, $anymarket_id)
    {
        $this->findModel($id, $anymarket_id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Product model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @param integer $anymarket_id
     * @return Product the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id, $anymarket_id)
    {
        if (($model = Product::findOne(['id' => $id, 'anymarket_id' => $anymarket_id])) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
    
    public function actionList(){        
        
        if(Yii::$app->request->isAjax){
            
            $myUserID = Yii::$app->request->get('id');
            
            $rows = (new \yii\db\Query())
                ->select(['anymarket_id'])
                ->from('product')
                ->where(['user_id' => $myUserID])
                //->limit(10)
                ->all();


            
            return json_encode($rows);

        } 
    }
    
    public function actionUpload() {
        $model = new DynamicModel([
            'nama', 'file_id'
            ]);

        // behavior untuk upload file
        $model->attachBehavior('upload', [
            'class' => 'mdm\upload\UploadBehavior',
            'attribute' => 'file',
            'savedAttribute' => 'file_id' // coresponding with $model->file_id
        ]);

        // rule untuk model
        $model->addRule('nama', 'string')
            ->addRule('file', 'file', ['extensions' => 'jpg']);

        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->saveUploadedFile() !== false) {
                Yii::$app->session->setFlash('success', 'Upload Sukses');
            }
        }
        return $this->render('upload',['model' => $model]);
        }
    
}
