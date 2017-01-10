<?php

use yii\helpers\Html;
use yii\helpers\ArrayHelper;
use yii\widgets\ActiveForm;
use app\models\User;
use app\models\Store;

/* @var $this yii\web\View */
/* @var $model app\models\UserStoreRole */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="user-store-role-form">

    <?php $form = ActiveForm::begin(); ?>
   
    <?php // $form->field($model, 'user_id')->dropDownList(ArrayHelper::map(User::find()->all(), 'id', 'username')) ?>
    <?= $form->field($model, 'user_id')->dropDownList(ArrayHelper::map(User::find()->select(['username', 'email','id'])->all(), 'id', 'displayName')) ?>    

    <?= $form->field($model, 'store_id')->dropDownList(ArrayHelper::map(Store::find()->select(['name','id'])->all(), 'id', 'name')) ?>   
    
    <?= $form->field($model, 'role')->dropDownList([ 'admin' => 'Admin', 'manager' => 'Manager', 'operator' => 'Operator', ], ['prompt' => '']) ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
