<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $dataProvider yii\data\ActiveDataProvider */

use app\models\Store;

// Selects the stores "Destaque"
$stores = Store::find()->all();



$this->title = Yii::t('app', 'Stores');
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="store-category-index">
    <h1><?= Html::encode($this->title) ?></h1>
    <?php foreach($stores as $store){ ?>
        <div class="media col-sm-3">
            <div class="media-left">
                <a href="/store/show?id=<?=$store->id?>">
                    <img class="media-object" src="/images/logo-placeholder.jpg" width="64" height="64" alt="..."></a></div>
            <div class="media-body">
                <a href="/store/show?id=<?=$store->id?>">
                <h4 class="media-heading"><?=$store->name?></h4>
                <h6>
                    <?=$store->observation?>
                </h6>
                </a>
            </div>
        </div>
    <?php }  ?>
</div>
