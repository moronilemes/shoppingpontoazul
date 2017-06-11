<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
//use yii\bootstrap\Nav;
//use yii\bootstrap\NavBar;
//use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use app\models\Category;
use app\models\Store;

// Selects the stores "Destaque"
$stores = Store::find()->all();
$categories = Category::find()->all();

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>

    <!-- Custom styles for this template -->
    <link href="/css/custom-public.css" rel="stylesheet">

</head>
<body class="nav-md">
  <div id="fb-root"></div>
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.9&appId=145564478901286";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));</script>
<?php $this->beginBody() ?>



    <div class="container">


<div class="navbar-wrapper">
      <div class="container-fluid">

        <nav class="navbar navbar-default">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only"><?=Yii::t('app', 'Navigation')?></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="/"><?=Yii::t('app', 'Shopping Ponto Azul')?></a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li class=""><a href="/store-category/show/"><?=Yii::t('app', 'Stores')?></a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?=Yii::t('app', 'Stores')?> <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <?php

                            foreach($categories as $thisCategory){
                                echo "<li><a href='/store-category/show?id=".$thisCategory->id."'>".Yii::t('app', $thisCategory->name)."</a></li>";
                            }

                            ?>
                        </ul>
                    </li>
                </ul>
            </div>
          </div>
        </nav>

      </div>
    </div>


    <div class="page-content">
            <div class="col-sm-3 col-xs-3">
                <div class="panel panel-default">
                    <div class="panel-heading"><?=Yii::t('app', 'Products')?></div>
                    <ul class="list-group">
                        <?php
                            foreach($categories as $thisCategory){
                                echo "<a href='/store-category/show?id=".$thisCategory->id."'><li class='list-group-item'>".Yii::t('app', $thisCategory->name)."</li></a>";
                            }
                        ?>
                    </ul>
                </div>
            </div>
            <div class="col-sm-9 col-xs-9">
                <?= $content ?>
            </div>
        </div>
    </div>

        <footer>
            <div class="clearfix"></div>
            <div>

            </div>
            <div class="">
                &copy; <?=Yii::t('app', 'Shopping Ponto Azul')?> <?= date('Y') ?> ||
                <a class='btn btn-default' href="/site/login/"><?=Yii::t('app', 'Login')?></a>
            </div>
        </footer>


    </div>



<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
